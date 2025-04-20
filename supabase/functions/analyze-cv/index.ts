
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

    console.log("Recibido texto del CV para analizar (primeros 100 caracteres):", cvText.substring(0, 100));

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

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de la API de OpenAI:", errorData);
      throw new Error(`Error from OpenAI API: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("Respuesta recibida de OpenAI");
    
    const analysis = data.choices[0].message.content;
    console.log("Análisis en texto plano:", analysis.substring(0, 100) + "...");

    try {
      // Parse the response to ensure it's valid JSON
      const parsedAnalysis = JSON.parse(analysis);
      console.log("Análisis parseado correctamente como JSON");

      return new Response(
        JSON.stringify(parsedAnalysis),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error("Error al parsear respuesta de OpenAI como JSON:", parseError);
      // Intentar crear un objeto JSON válido a partir de la respuesta en texto
      const fallbackResponse = {
        overall: "Análisis realizado, pero hubo un problema al formatear los resultados.",
        sections: [
          {
            title: "Respuesta Completa",
            content: analysis,
            type: "suggestion"
          }
        ]
      };
      
      return new Response(
        JSON.stringify(fallbackResponse),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error analizando CV:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error analyzing CV',
        overall: "Lo sentimos, ha ocurrido un error al analizar tu CV.",
        sections: [
          {
            title: "Error",
            content: error instanceof Error ? error.message : "Error desconocido",
            type: "improvement"
          }
        ]
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 // Devolvemos 200 en lugar de 500 para que el cliente reciba la respuesta
      }
    );
  }
});
