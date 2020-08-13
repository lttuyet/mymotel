const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");
const Member = require('../models/members');
const Motel = require('../models/motels');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            // Match user
            email = email.trim();
            email = email.toLowerCase();

            const user = await Member.findOne({ email });

            if (!user) {
                return done(null, false, { status: "failed", message: "Tài khoản không tồn tại!" });
            }

            // Match password
            const motel = await Motel.findOne({ _id: user.mtID });

            bcrypt.compare(password, motel.password, (err, isMatch) => {
                if (err) {
                    throw err;
                }

                if (isMatch) {
                    return done(null, { user, motel });
                } else {
                    return done(null, false, { status: "failed", message: "Sai mật khẩu!" });
                }
            });
        })
    );

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.KEY
            },
            function (jwtPayload, cb) {
                return Member.findOne({ _id: jwtPayload._id })
                    .then(user => {
                        return cb(null, user);
                    })
                    .catch(err => {
                        return cb(err);
                    });
            }
        )
    );
};
