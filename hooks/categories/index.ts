import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Category = {
  _id: string;
  name: string;
  type?: string;
};

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/categories");
      return data as Category[];
    },
  });
};
