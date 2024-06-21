import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Product } from "../types";

type ProductsHook = ReturnType<typeof useQuery<Product[]>>;

export const useProducts = (category?: string): ProductsHook => {
  const productsEndpoint = category
    ? `/api/products/category/${category}`
    : `/api/products`;

  return useQuery({
    queryKey: [category],
    queryFn: async () => {
      const result = await axios.get(productsEndpoint);
      return result.data;
    },
    gcTime: 10 * 60 * 1000, // 10 minutes before garbage collection.
  });
};
