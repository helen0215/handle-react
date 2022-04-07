require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

const app = new Koa();
const router = new Router();

const { PORT, MONGO_URI } = process.env;

router.use('/api', api.routes());

// 라우터 적용 전에 bodyParser를 적용해야함 
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(e => {
      console.error(e);
    });

app.listen(port, () => {
  console.log('Listening to port 4000');
});
