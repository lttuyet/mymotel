const Motel = require('../models/motels');
const Member = require('../models/members');
const checkMotel = require('../checks/motel');
const checkMember = require('../checks/member');
const passport = require('passport');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        let { mtName, mtImage, mtPassword, mEmail, mName, mImage } = req.body;
        const dataMotel = await checkMotel.checkRegister(mtName, mtImage, mtPassword);
        const dataMember = await checkMember.checkRegister(mName, mImage, mEmail);
        const motel = await Motel.create(dataMotel);
        const member = await Member.create({ name: dataMember.name, image: dataMember.image, email: dataMember.email, mtID: motel._id });

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
        passport.authenticate('local', { session: false }, (err, data, info) => {
            if (err || !data) {
                return res.json({
                    status: "failed",
                    message: info.message
                });
            }

            req.login(data, { session: false }, async (err) => {
                if (err) {
                    res.send(err);
                }

                const motelInfo = {
                    name: data.motel.name,
                    image: data.motel.image
                };
                const userInfo = {
                    _id: data.user._id,
                    mtID: data.user.mtID
                }
                const token = jwt.sign(userInfo, process.env.KEY);

                return res.json({
                    status: "success",
                    code: 2020,
                    message: 'Đăng nhập thành công!',
                    user: data.user,
                    motel: motelInfo,
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


exports.edit = async (req, res) => {
    try {
        const { name, image } = req.body;
        const { mtID } = req.user;
        const data = await checkMotel.checkEdit(name, image);
        const motel = await Motel.updateOne({ _id: mtID }, data);

        return res.json({
            status: "success",
            message: "Cập nhật thông tin phòng trọ thành công!"
        });
    } catch (e) {
        console.log("ERROR: ");
        console.log(e);

        return res.json({
            status: "failed",
            message: e.message
        });
    }
}