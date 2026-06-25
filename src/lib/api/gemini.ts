const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function askGemini(prompt: string, context?: string) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key not set");

  const fullPrompt = context
    ? `${prompt}\n\nContext data:\n${context}`
    : prompt;

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
      systemInstruction: {
        parts: [
          {
            text: "You are NEXUS AI, a Web3 market analyst assistant. Be concise, data-driven, authoritative, and slightly cinematic in tone. Keep responses under 150 words.",
          },
        ],
      },
    }),
  });

  if (!res.ok) throw new Error("Gemini API error");
  const data = await res.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response."
  );
}
