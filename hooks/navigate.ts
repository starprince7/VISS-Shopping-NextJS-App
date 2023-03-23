import { useRouter } from "next/router";

export const navigateTo = (url: string) => {
  const router = useRouter();
  router.push(url);
};
