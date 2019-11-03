import { useRouter } from 'next/router';

export default async (url: string) => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    await router.push(url);
  }
};
