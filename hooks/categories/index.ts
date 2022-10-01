import axios from "axios";
import { useEffect, useState } from "react";

type Categories = {
  _id: string;
  name: string;
  type?: string;
};

type Response = { data: Categories[] };

const useCategories = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  useEffect(() => {
    async function getCategories() {
      const res: Response = await axios.get("/api/categories");
      setCategories(res.data);
    }
    getCategories();
  }, []);

  return categories;
};

export default useCategories;
