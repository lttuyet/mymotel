const checkMember = require('../checks/member');
const Member = require('../models/members');
const Motel = require('../models/motels');
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

exports.edit = async (req, res) => {
    try {
        const { _id } = req.user;
        const { name, email, image } = req.body;
        const data = await checkMember.checkEdit(_id, name, image, email);
        const member = await Member.updateOne({ _id }, data, { runValidators: true });

        return res.json({
            status: "success",
            message: "Cập nhật thông tin cá nhân thành công!"
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

exports.delete = async (req, res) => {
    try {
        const { _id, mtID } = req.user;
        const member = await Member.updateOne({ _id }, { isDeleted: true }, { runValidators: true });
        const countExistedMember = await Member.countDocuments({ mtID, isDeleted: false });

        if (countExistedMember < 1) {
            await Motel.updateOne({ _id: mtID }, { isDeleted: true }, { runValidators: true });
        }

        return res.json({
            status: "success",
            message: "Rời khỏi gia đình thành công!"
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