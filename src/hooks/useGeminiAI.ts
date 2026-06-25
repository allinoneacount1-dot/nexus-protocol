import { useState, useCallback } from "react";
import { askGemini } from "@/lib/api/gemini";

export function useGeminiAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = useCallback(async (prompt: string, context?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await askGemini(prompt, context);
      return response;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { ask, loading, error };
}
