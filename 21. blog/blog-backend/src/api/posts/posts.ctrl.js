import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const {ObjectId} = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const {id} = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 404;
    return;
  }
  return next();
}

/* 포스트 작성
POST /api/posts
{title, body}
*/
export const write = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(), // required() 가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(), // 문자열로만 이루어진 배열
  });
  
  // 검증하고 나서 실패인 경우 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // bad request
    ctx.body = result.error;
    return;
  }
   
  // REST API의 Request Body는 ctx.request.body 에서 조회할 수 있음
  const {title, body, tags} = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
}

export const list = async ctx => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = async ctx => {
  const {id} = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
 
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = async ctx => {
  const {id} = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공했지만 응답할 데이터는 없음)  
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{title, body}
*/
export const update = async ctx => {
  const {id} = ctx.params;
  
  // required가 없음
  const schema = Joi.object().keys({
    title: Joi.string(), 
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면 업데이트 된 데이터를 반환함, false 일경우 업데이트 되기 전의 데이터를 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
