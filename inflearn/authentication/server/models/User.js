const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  // 필드 작성
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    // trim은 space를 없애주는 역할ㄴ
    trim: true,
    // 유니크하게 사용해야할경우
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  // 유저 역할별 분리
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  // 유효성 검사
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  // 비밀번호를 바꿀때만 암호화 시켜야 함. email을 바꾸거나 할때 또 바뀌면 안됨
  if (user.isModified("password")) {
    // 비밀번호를 암호화 시킨다.
    // salt 만들기
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      // 해싱 myPlaintextPassword : 순수하게 넣는 비밀번호를 해싱을 위해 넣어주기 위해 넣는 값, 새로 생성 가능
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    // 비밀번호를 바꾸지 않는 경우에는 바로 다음 단계를 진행하도록 한다.
    next();
  }
});

// 입력된 password와 db에 있는 password가 일치하는지 확인하는 fn
userSchema.methods.comparePassword = function (
  plainPassword,
  callbackfunction
) {
  // plainPassword 123123123 , 암호화된 비밀번호가 같은지 체크해야함.
  // 이 역시 암호화를 진행하여 맞는지 체크를 해야함, 암호화된 값을 복호화 할 수 없음.
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    // 여기서 this.password의 경우 이 method를 불러내는 객체 내부에 있는 password를 이용함
    // findOne를 통해서 생성된 값이 이용되는거임
    if (err) return callbackfunction(err);
    callbackfunction(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  // json web token을 이용해서 토큰 생성하기
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secretToken");

  // user._id + "secreateToken" => token이 된다.
  // 'secretToken -> user._id 가 나오고 조회가 가능해진다
  // 생성된 token을 userSchema의 token field에 넣어ㅜㄴ다.
  user.token = token;
  user
    .save()
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => cb(err));
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;
  // json web token 코드 참고함
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user
      .findOne({ _id: decoded, token: token })
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  });
};

// 모델로 스키마를 감싸줌
const User = mongoose.model("User", userSchema);

// 이 모델을 다른 파일에서도 사용할 수 있게
module.exports = { User };
