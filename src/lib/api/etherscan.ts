const BASE = "https://api.etherscan.io/api";

export async function getEthSupply() {
  const key = import.meta.env.VITE_ETHERSCAN_API_KEY;
  if (!key) throw new Error("Etherscan API key not set");
  const res = await fetch(`${BASE}?module=stats&action=ethsupply&apikey=${key}`);
  if (!res.ok) throw new Error("Failed to fetch ETH supply");
  const data = await res.json();
  return parseInt(data.result) / 1e18;
}

export async function getGasOracle() {
  const key = import.meta.env.VITE_ETHERSCAN_API_KEY;
  if (!key) throw new Error("Etherscan API key not set");
  const res = await fetch(`${BASE}?module=gastracker&action=gasoracle&apikey=${key}`);
  if (!res.ok) throw new Error("Failed to fetch gas");
  const data = await res.json();
  return data.result;
}
