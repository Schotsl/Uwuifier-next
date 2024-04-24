import OpenAI from "https://deno.land/x/openai@v4.32.1/mod.ts";

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const model = "ft:gpt-3.5-turbo-0125:personal:un-uwuifier:9AcoaRci";

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Get input from the request body
  const body = await req.json();
  const input = body.input;

  // If input is empty
  if (!input) {
    return new Response(
      JSON.stringify({ error: "The input is missing from the body" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }

  // If input is more than 512 characters
  if (input.length > 512) {
    return new Response(
      JSON.stringify({ error: "The input can't be more than 512 characters" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      auth: {
        persistSession: false,
      },
    },
  );

  // Find sentence in the database
  const { data } = await supabaseClient
    .from("sentences")
    .select("output")
    .eq("model", model)
    .eq("input", input)
    .single();

  // If sentence is found in the database return it
  if (data) {
    return new Response(JSON.stringify({ output: data.output }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }

  const client = new OpenAI();

  // Call the OpenAI API using our custom translation model
  const response = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: "You're a helpful assistant tasked with un-uwuifying text",
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  const output = response.choices[0].message.content;
  const insert = async () => {
    await supabaseClient.from("sentences").insert([
      {
        model,
        input,
        output,
      },
    ]);
  };

  // Save the sentence in the database without waiting for it to finish
  insert();

  // Return the new sentence
  return new Response(JSON.stringify({ output }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
