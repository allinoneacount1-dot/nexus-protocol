import { useState, useCallback } from "react";
import { usePollinations } from "@/hooks/usePollinations";
import { useAppStore } from "@/lib/stores/appStore";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { Sparkles, X, Image } from "lucide-react";

const SUGGESTIONS = [
  "Cyberpunk crypto trader in neon-lit Tokyo",
  "Abstract blockchain galaxy",
  "AI neural network as cosmic web",
];

export default function AIImageForge() {
  const [prompt, setPrompt] = useState("");
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const { generate, loading, currentUrl, onLoad } = usePollinations();
  const { generatedImages, addGeneratedImage } = useAppStore();

  const handleGenerate = useCallback(() => {
    const p = prompt.trim();
    if (!p || loading) return;
    const url = generate(p);
    if (url) addGeneratedImage(url);
  }, [prompt, loading, generate, addGeneratedImage]);

  const handleSuggestion = (s: string) => {
    setPrompt(s);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <>
      <GlassCard className="p-6 border border-white/5 space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan" />
          <h3 className="font-display text-lg text-white tracking-wide">
            AI Image Forge
          </h3>
        </div>

        <div className="flex gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your image..."
            disabled={loading}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5
                       text-sm text-white placeholder:text-white/30
                       outline-none focus:border-cyan/40 transition-colors
                       disabled:opacity-50"
          />
          <Button onClick={handleGenerate} disabled={!prompt.trim() || loading}>
            {loading ? <Loader size="sm" /> : <Sparkles className="w-4 h-4 mr-1.5" />}
            Generate
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              disabled={loading}
              className="px-3 py-1.5 text-xs rounded-full border border-white/10
                         text-white/50 hover:text-cyan hover:border-cyan/30
                         hover:bg-cyan/5 transition-colors disabled:opacity-30 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>

        {loading && currentUrl && (
          <div className="flex items-center justify-center py-8">
            <Loader size="lg" />
          </div>
        )}

        {currentUrl && !loading && (
          <div className="rounded-lg overflow-hidden border border-white/5">
            <img
              src={currentUrl}
              alt={prompt}
              onLoad={onLoad}
              className="w-full h-auto animate-in fade-in duration-700"
            />
          </div>
        )}

        {generatedImages.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs text-white/30 font-mono uppercase tracking-wider">
              Recent Generations
            </p>
            <div className="grid grid-cols-3 gap-2">
              {generatedImages.map((url, i) => (
                <button
                  key={`${url}-${i}`}
                  onClick={() => setLightboxUrl(url)}
                  className="group relative aspect-square rounded-lg overflow-hidden
                             border border-white/5 hover:border-cyan/30 transition-colors cursor-pointer"
                >
                  <img
                    src={url}
                    alt={`Generated ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                                  transition-opacity flex items-center justify-center">
                    <Image className="w-5 h-5 text-white/70" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </GlassCard>

      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            onClick={() => setLightboxUrl(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white
                       transition-colors cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxUrl}
            alt="Full view"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
}
