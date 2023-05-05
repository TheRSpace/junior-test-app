import { useQuery } from "@tanstack/react-query";
import { checkSku } from "./productApi";

export const useCheckSku = (sku) => {
  return useQuery({ queryKey: ["product", sku], queryFn: checkSku }, { enabled: false });
};
