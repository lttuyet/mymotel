const Motel = require('../models/motels');
const Member = require('../models/members');
const checkMotel = require('../checks/motel');
const checkMember = require('../checks/member');
const passport = require('passport');

exports.register = async (req, res) => {
    try {
        let { mtName, mtImage, mtPassword, mEmail, mName, mImage } = req.body;
        const dataMotel = await checkMotel.checkRegister(mtName, mtImage, mtPassword);
        const dataMember = await checkMember.checkRegister(mName, mImage, mEmail);
        const motel = await Motel.create(dataMotel);
        const member = await Member.create({ name: dataMember.name, image:dataMember.image, email: dataMember.email, mtID: motel._id });

        return res.json({
            status: "success",
            message: "Tạo tài khoản phòng trọ thành công!"
        });
    } catch (e) {
        console.log('ERROR: ' + e);

        return res.json({
            status: "failed",
            message: e.message
        });
    }
}

exports.login = async (req, res, next) => {
    try {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.json({
                    status: "failed",
                    message: info.message
                });
            }

            req.login(user, { session: false }, async (err) => {
                if (err) {
                    res.send(err);
                }

                const motel = await M.find({_id:user._id});
                const userInfo = {
                    _id: user._id,
                    mAvatar: user.mAvatar,
                    mName: user.mName,
                    mEmail: user.mEmail,
                    mAge: user.mAge,
                    mRole: user.mRole,
                    mIsAdmin: user.mIsAdmin,
                    mPoints: user.mPoints,
                    fID: user.fID,
                    fName: family.fName,
                    fImage: family.fImage
                }

                const token = jwt.sign(userInfo, process.env.KEY);

                return res.json({
                    status: "success",
                    code: 2020,
                    message: 'Đăng nhập thành công!',
                    user: userInfo,
                    token
                });
            });
        })(req, res, next);
    } catch (e) {
        return res.json({
            status: "failed",
            code: 2022,
            message: "Lỗi kết nối! Vui lòng thử lại!"
        });
    }
}