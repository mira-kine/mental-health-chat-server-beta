// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import 'https://deno.land/x/xhr@0.2.1/mod.ts';
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';
// import { CreateCompletionRequest } from 'openai';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

const openai = new OpenAIApi(configuration);

serve(async (req) => {
  const { query } = await req.json();

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'testing',
    max_tokens: 256,
    temperature: 0,
    stream: false,
  });

  const {
    data: {
      id,
      choices: [{ text }],
    },
  } = response;

  // return fetch('https://api.openai.com/v1/completions', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(completionConfig),
  // });

  return new Response(JSON.stringify({ id, text }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
