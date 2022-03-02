const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !== '1') {
    ctx.status = 401; // Unauthorized
    return;
  }

  // Koa는 Express와 다르게 next 함수 호출 시 Promise를 반환함
  // Promise는 다음에 처리해야할 미들웨어가 끝나야 완료됨
  // next().then(() => {
  //   console.log('END');
  // });

  // async/await를 지원함
  await next();
  console.log('END');
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

app.use((ctx) => {
  ctx.body = 'hello world';
});

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
