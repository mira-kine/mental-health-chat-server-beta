// import * as dotenv from 'dotenv';
// dotenv.config();
// import { createClient } from '@supabase/supabase-js';
// import { Configuration, OpenAIApi } from 'openai';

// // Initialize supabase client
// const supabaseUrl = 'https://dgulbkgnnlitidkammdl.supabase.co';
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
// const client = createClient(supabaseUrl, supabaseKey);

// // generate Embeddings
// async function generateEmbeddings() {
//   // initialize openAI API
//   const configuration = new Configuration({
//     apiKey: process.env.OPEN_AI_KEY,
//   });
//   const openai = new OpenAIApi(configuration);
//   // create custom data for tomomi
//   const documents = [
//     // array of strings
//     // PDF's and other info can be turned into documents string format later on
//     'Did you want to talk about something in particular?',
//     'I am sorry to hear that',
//     'That is so exciting!',
//     'I see...',
//     'Here are some resources that may be helpful to you right now',
//   ];

//   for (const document of documents) {
//     // turn each string into embedding
//     const input = document.replace(/\n/g, '');
//     const embeddingResp = await openai.createEmbedding({
//       model: 'text-embedding-ada-002', // current most recent model to create embeddings
//       input,
//     });
//     // in the array of embedding response, destructure embedding
//     const [{ embedding }] = embeddingResp.data.data;
//     // store embedding and text into supabasedb
//     await client.from('documents').insert({
//       content: document,
//       embedding,
//     });
//   }
// }

// generateEmbeddings();

// // create edge function for a certain end point
// // ask-custom-data -> get relevant documents, asking chatgpt, returning the response
// //  supabase command line interface -> allows us to start creating edge functions from here

// // // const { Configuration, OpenAIApi } = require('openai');
// // import { Configuration, OpenAIApi } from 'openai';

// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // const openai = new OpenAIApi(configuration);

// // const resp = await openai.createCompletion({
// //   model: 'text-curie-001',
// //   prompt: 'Tomomi: Hey, how are you?\n You:',
// //   temperature: 0.5,
// //   max_tokens: 60,
// //   top_p: 1,
// //   frequency_penalty: 0.5,
// //   presence_penalty: 0,
// //   stop: ['You:'],
// // });
