import { createClient } from "@supabase/supabase-js";
import { fetchPlausible } from "./helper";
import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL) {
  throw new Error("The Supabase URL is missing");
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("The Supabase service role key is missing");
}

export async function POST(request: Request) {
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const promiseSpoke = fetchPlausible("Spoke sentence");
  const promiseCopied = fetchPlausible("Copied sentence");
  const promiseShared = fetchPlausible("Shared sentence");
  const promiseUwuified = fetchPlausible("Uwuified sentence");

  const [sentenceSpoke, sentenceCopied, sentenceShared, sentenceUwuified] =
    await Promise.all([
      promiseSpoke,
      promiseCopied,
      promiseShared,
      promiseUwuified,
    ]);

  // If we call a unneeded update the websocket will trigger so we need to check if the data has changed
  const { data: existingStats } = await supabaseClient
    .from("statistics")
    .select("*")
    .eq("id", "4e2e6f56-b4dc-4a38-9bf7-5d3c59321890")
    .single();

  if (
    existingStats &&
    existingStats.spoke_sentence === sentenceSpoke &&
    existingStats.copied_sentence === sentenceCopied &&
    existingStats.shared_sentence === sentenceShared &&
    existingStats.uwuified_sentence === sentenceUwuified
  ) {
    return;
  }

  await supabaseClient
    .from("statistics")
    .insert({
      spoke_sentence: sentenceSpoke,
      copied_sentence: sentenceCopied,
      shared_sentence: sentenceShared,
      uwuified_sentence: sentenceUwuified,
    })
    .eq("id", "4e2e6f56-b4dc-4a38-9bf7-5d3c59321890");

  return NextResponse.json({});
}
