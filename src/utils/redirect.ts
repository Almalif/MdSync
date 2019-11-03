import Router from 'next/router';

export default async (path: string) => {
  await Router.push(path);
};
