import Router from 'next/router';

export default async (url: string) => {
  if (typeof window !== 'undefined') {
    await Router.push(url);
  }
};
