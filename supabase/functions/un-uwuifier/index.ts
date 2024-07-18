import OpenAI from "https://deno.land/x/openai@v4.32.1/mod.ts";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import {
  createHash,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from "node:crypto";

const model = "ft:gpt-3.5-turbo-0125:personal:un-uwuifier:9mJoBiQj";

const hashInputString = (input: string): string => {
  const hash = createHash("sha256");
  hash.update(input);
  return hash.toString();
};

const deriveKeyFromInput = (input: string): Uint8Array => {
  const hash = createHash("sha256");
  hash.update(input);
  return hash.digest().slice(0, 32); // Use the first 32 bytes of the hash as the key
};

const encryptTranslation = (
  translation: string,
  key: Uint8Array
): { iv: string; encryptedData: string } => {
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  const encrypted = cipher.update(new TextEncoder().encode(translation));
  const finalBuffer = new Uint8Array([...encrypted, ...cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedData: finalBuffer.toString(),
  };
};

const decryptTranslation = (
  iv: string,
  encryptedData: string,
  key: Uint8Array
): string => {
  const decipher = createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"));
  const decrypted = decipher.update(Buffer.from(encryptedData, "hex"));
  const finalBuffer = new Uint8Array([...decrypted, ...decipher.final()]);
  return new TextDecoder().decode(finalBuffer);
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const body = await req.json();
  const input = body.input;

  if (!input) {
    return new Response(
      JSON.stringify({ error: "The input is missing from the body" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  if (input.length > 512) {
    return new Response(
      JSON.stringify({ error: "The input can't be more than 512 characters" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      auth: {
        persistSession: false,
      },
    }
  );

  const hashedInput = hashInputString(input);
  console.log(hashedInput);
  const key = deriveKeyFromInput(input);

  const { data } = await supabaseClient
    .from("sentences")
    .select("iv, encrypted_data")
    .eq("model", model)
    .eq("input", hashedInput)
    .single();

  if (data) {
    const decryptedOutput = decryptTranslation(
      data.iv,
      data.encrypted_data,
      key
    );

    return new Response(JSON.stringify({ output: decryptedOutput }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }

  const client = new OpenAI();

  const response = await client.chat.completions.create({
    model,
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
  const { iv, encryptedData } = encryptTranslation(output, key);

  const insert = async () => {
    await supabaseClient.from("sentences").insert([
      {
        model,
        input: hashedInput,
        iv,
        encrypted_data: encryptedData,
      },
    ]);
  };

  insert();

  return new Response(JSON.stringify({ output }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
