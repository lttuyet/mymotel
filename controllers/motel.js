const Motel = require('../models/motels');
const Member = require('../models/members');
const checkMotel = require('../checks/motel');
const checkMember = require('../checks/member');

exports.register = async (req, res) => {
    try {
        let { mtName, mtPassword, mEmail, mName } = req.body;
        const dataMotel = await checkMotel.checkRegister(mtName, mtPassword);
        const dataMember = await checkMember.checkRegister(mName, mEmail);
        const motel = await Motel.create(dataMotel);
        const member = await Member.create({ name: dataMember.name, email: dataMember.email, mtID: motel._id });

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