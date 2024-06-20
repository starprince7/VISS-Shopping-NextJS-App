import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types";

type ProductHook = ReturnType<typeof useQuery<Product>>;

export const useProduct = (productId: string): ProductHook => {
  const productEndpoint = `/api/products/${productId}`;

  return useQuery({
    queryKey: [productId],
    queryFn: async () => {
      const result = await axios.get(productEndpoint);
      return result.data;
    },
    gcTime: 10 * 60 * 1000, // 10 minutes before garbage collection.
  });
};
