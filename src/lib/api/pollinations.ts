export function getPollinationsUrl(prompt: string, width = 512, height = 512) {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true`;
}
