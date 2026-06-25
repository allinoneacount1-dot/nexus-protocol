export async function getProtocols() {
  const res = await fetch("https://api.llama.fi/protocols");
  if (!res.ok) throw new Error("Failed to fetch protocols");
  return res.json();
}

export async function getChains() {
  const res = await fetch("https://api.llama.fi/v2/chains");
  if (!res.ok) throw new Error("Failed to fetch chains");
  return res.json();
}

export async function getHistoricalChainTvl() {
  const res = await fetch("https://api.llama.fi/v2/historicalChainTvl");
  if (!res.ok) throw new Error("Failed to historical TVL");
  return res.json();
}
