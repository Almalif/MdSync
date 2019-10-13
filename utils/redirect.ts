export default (ctx: any) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
  }
};
