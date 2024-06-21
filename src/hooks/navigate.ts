import { useRouter } from "next/router";

export const NavigateTo = (url: string) => {
  const router = useRouter();
  router.push(url);
};
