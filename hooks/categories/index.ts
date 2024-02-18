import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Category = {
  _id: string;
  name: string;
  type?: string;
};
type Response = ReturnType<typeof useQuery<Category[]>>;

export const useCategories = (): Response => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/categories");
      return data as Category[];
    },
  });
};
