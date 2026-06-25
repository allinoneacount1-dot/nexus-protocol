import { useState, useCallback } from "react";
import { getPollinationsUrl } from "@/lib/api/pollinations";

export function usePollinations() {
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const generate = useCallback((prompt: string) => {
    setLoading(true);
    const url = getPollinationsUrl(prompt);
    setCurrentUrl(url);
    return url;
  }, []);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return { generate, loading, currentUrl, onLoad };
}
