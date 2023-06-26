// @ts-nocheck
import 'https://deno.land/x/xhr@0.2.1/mod.ts';
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';
import { CreateCompletionRequest } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import 'xhr_polyfill';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: Deno.env.get('OPEN_AI_KEY,'),
  })
);

serve(async (req) => {
  const { query } = await req.json();

  const response = await openai.CreateCompletionRequest({
    model: 'text-davinci-003',
    prompt: query,
    max_tokens: 256,
    temperature: 0,
    stream: false, // so that entire response is complete before returning
  });

  const {
    data: {
      choices: [{ text }],
    },
  } = response;

  return fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(completionConfig),
  });
});

// supabase functions serve --env-file ./supabase/.env.local --debug --no-verify-jwt --debug
// supabase functions serve --env-file ./supabase/.env.local --no-verify-jwt --legacy-bundle

// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.5.0';
// import GPT3Tokenizer from 'https://esm.sh/gpt3-tokenizer@1.1.5';
// import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.1.0';
// import { stripIndent, oneLine } from 'https://esm.sh/common-tags@1.8.2';

// export const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers':
//     'authorization, x-client-info, apikey, content-type',
// };

// serve(async (req) => {
//   // logic of end point, chat-response-data
//   if (req.method === 'OPTIONS') {
//     return new Response('ok', { headers: corsHeaders });
//   }

//   // if request query is "I want to talk"
//   const { query } = await req.json();
//   const input = query.replace(/\n/g, ' ');

//   const configuration = new Configuration({
//     apiKey: process.env.OPEN_AI_KEY,
//   });
//   const openai = new OpenAIApi(configuration);

//   // create an embedding for our question / input
// });
