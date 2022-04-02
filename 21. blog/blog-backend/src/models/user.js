import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// 스키마 메서드는 내부에서 this에 접근하므로 일반 함수로 작성
// 모델 메서드
UserSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

// 모델 스태틱 메서드
UserSchema.statics.findByUsername = function(username) {
  return this.findOne({ username });
};


const User = mongoose.model('User', UserSchema);
export default User;