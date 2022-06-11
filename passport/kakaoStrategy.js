const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/user');

module.exports = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  },async (accessToken, refreshToken, profile, done) => {
    console.info('___new KakaoStrategy()');
    console.log('___kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: {user_Id: profile.id}
      });
      if (exUser) {
        console.log('___kakao exUser', exUser);
        done(null, exUser);
      } else {
        const newUser = await User.create({
          user_ID: profile.id,
          user_name: profile.displayName,
          user_PW: '1111',
        });
        console.log('___kakao newUser', newUser);
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
);
