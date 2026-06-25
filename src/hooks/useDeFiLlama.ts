import { useQuery } from "@tanstack/react-query";
import { getProtocols, getChains } from "@/lib/api/defillama";

export function useProtocols() {
  return useQuery({
    queryKey: ["protocols"],
    queryFn: getProtocols,
    staleTime: 300000,
  });
}

export function useChains() {
  return useQuery({
    queryKey: ["chains"],
    queryFn: getChains,
    staleTime: 300000,
  });
}
