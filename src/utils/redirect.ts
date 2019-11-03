import Router from 'next/router';

export default (path: string) => {
  return  Router.push(path);
};
