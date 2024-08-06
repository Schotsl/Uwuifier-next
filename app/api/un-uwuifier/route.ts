import { OpenAI } from "openai";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import {
  inputToHash,
  inputToKey,
  outputToEncrypted,
  encryptedToOutput,
} from "./helper";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const OPENAI_API_MODEL = process.env.OPENAI_API_MODEL!;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!OPENAI_API_KEY) {
  throw new Error("The OpenAI API key is missing");
}

if (!OPENAI_API_MODEL) {
  throw new Error("The OpenAI API model is missing");
}

if (!SUPABASE_URL) {
  throw new Error("The Supabase URL is missing");
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("The Supabase service role key is missing");
}

async function fetchTranslation(input: string) {
  const client = new OpenAI({ apiKey: OPENAI_API_KEY });
  const response = await client.chat.completions.create({
    model: OPENAI_API_MODEL,
    messages: [
      {
        role: "system",
        content: "Please un-uwuify this text",
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  const output = response.choices[0].message.content!;
  return output;
}

async function fetchCache(
  inputHashed: string,
  inputKey: Buffer,
): Promise<string | null> {
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data, error: selectError } = await supabaseClient
    .from("sentences")
    .select("vector,output")
    .eq("model", OPENAI_API_MODEL)
    .eq("input", inputHashed)
    .limit(1);

  if (selectError) {
    throw selectError;
  }

  if (data.length > 0) {
    const decryptedOutput = encryptedToOutput(
      data[0].vector,
      data[0].output,
      inputKey,
    );

    return decryptedOutput;
  }

  return null;
}

async function insertCache(
  inputHashed: string,
  inputKey: Buffer,
  output: string,
) {
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { vector, encrypted } = outputToEncrypted(output, inputKey);
  const { error: inertError } = await supabaseClient.from("sentences").insert([
    {
      model: OPENAI_API_MODEL,
      input: inputHashed,
      output: encrypted,
      vector,
    },
  ]);

  if (inertError) {
    throw inertError;
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const input = body.input;

  if (!input) {
    return NextResponse.json(
      { message: "The input is missing from the body" },
      { status: 400 },
    );
  }

  if (input.length > 512) {
    return NextResponse.json(
      { message: "The input can't be more than 512 characters" },
      { status: 400 },
    );
  }

  const inputHashed = inputToHash(input);
  const inputKey = inputToKey(input);

  const outputCached = await fetchCache(inputHashed, inputKey);

  if (outputCached) {
    return NextResponse.json({ output: outputCached });
  }

  const outputTranslated = await fetchTranslation(input);

  // Once after is supported in Next I'd like to use it here
  await insertCache(inputHashed, inputKey, outputTranslated);

  return NextResponse.json({ output: outputTranslated });
}
