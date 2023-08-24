const express = require("express");
const app = express();
const port = 4000;
const { User } = require("./models/User");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
// application/x-www-form-urlencoded로 오는 데이터를 분석할 수 있게
app.use(express.urlencoded({ extended: true }));

// application/json을 분석할 수 있게 하기 위해서
app.use(express.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 동주니에요");
});

// 회원가입을 위한 Routing
app.post("/api/user/register", (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면,
  // 그것들을 데이터베이스에 넣어준다.

  // request.body에는  {id : asdf, pass : asdf ...} 등이 있게되는데
  // 이때, paser를 통해 그대로 사용할 수 있도록 하는것이다.
  const user = new User(req.body);
  // save 전에 암호화 해야함. mongoos의 기능을 사용함.
  user
    .save()
    .then((userInfo) => res.status(200).json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

app.post("/api/user/login", (req, res) => {
  // 요청된 이메일을 데이터베이스 찾기
  User.findOne({ email: req.body.email })
    .then((docs) => {
      if (!docs) {
        return res.json({
          loginSuccess: false,
          messsage: "제공된 이메일에 해당하는 유저가 없습니다.",
        });
      }
      docs.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            messsage: "비밀번호가 틀렸습니다.",
          });
        // Password가 일치하다면 토큰 생성
        docs.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          // 토큰을 저장
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

// auth 는 미들웨어,end 포인트에서 callback fn을 받기 전 중간 단계에서 작업을 수행시켜줌
app.get("/api/user/auth", auth, (req, res) => {
  // 여기까지 미들웨어을 통과했다면, Authentication 이 True라는 말이다.
  // 여기서 원하는 것만 전달 해 준다.
  // 앞선 미들웨어에서, req에 id와 token을 추가 했기 때문에 조회 과정 없이 req를 이용하여 id 를 확인할 수 있다.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
  });
});

app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then((se) => {
      return res.status(200).send({ success: true });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요 여기는 서버입니다 반갑습니다");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
