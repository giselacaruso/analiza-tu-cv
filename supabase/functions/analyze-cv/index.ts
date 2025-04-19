
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cvText } = await req.json();

    if (!cvText) {
      throw new Error('No CV text provided');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional CV/resume analyzer. Analyze CVs and provide constructive feedback in the following JSON format:
            {
              "overall": "Brief overall assessment",
              "sections": [
                {
                  "title": "Section title",
                  "content": "Detailed feedback",
                  "type": "positive" | "improvement" | "suggestion"
                }
              ]
            }`
          },
          {
            role: 'user',
            content: cvText
          }
        ],
      }),
    });

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Parse the response to ensure it's valid JSON
    const parsedAnalysis = JSON.parse(analysis);

    return new Response(
      JSON.stringify(parsedAnalysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error analyzing CV:', error);
    return new Response(
      JSON.stringify({ error: 'Error analyzing CV' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
