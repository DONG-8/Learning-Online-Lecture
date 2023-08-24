const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증과 관련된 처리를 하는 곳
  // 클라이언트 쿠키에서 토큰을 가져옵니다.
  let token = req.cookies.x_auth;
  // 토큰을 복호화 한 후, 유저를 찾는다.
  // user model에서 복호화 하는 로직을 작성해줌
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    // req에 넣어줌으로서,  다음 으로 진행되는 cb의 req에서 사용하기 위해서
    req.token = token;
    req.user = user;
    next();
  });
  // 유저가 있으면 인증 ok,
  // 유저가 없으면 인즌 no
};

module.exports = { auth };
