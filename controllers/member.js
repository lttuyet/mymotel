const checkMember = require('../checks/member');
const Member = require('../models/members');
const motel = require('../checks/motel');

exports.add = async (req, res) => {
    try {
        const { mtID } = req.user;
        const { email, name, image } = req.body;
        const dataMember = await checkMember.checkRegister(name, image, email);
        const member = await Member.create({ name: dataMember.name, image: dataMember.image, email: dataMember.email, mtID });

        return res.json({
            status: "success",
            message: "Thêm thành viên thành công!"
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