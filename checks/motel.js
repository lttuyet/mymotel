const bcrypt = require("bcrypt");
const SALT_ROUNDS = 9;
const Motel = require('../models/motels');
const { formatString, checkImage } = require('./basic');

const checkName = async (name) => {
    try {
        name = await formatString(name);

        return name;
    } catch (e) {
        console.log("ERROR: " + e);
        throw { message: "Tên phòng trọ không hợp lệ!" };
    }
}

const checkPassword = async (password) => {
    try {
        if (password.split(" ").length !== 1 || password.length < 6) {
            throw "failed";
        }

        password = await bcrypt.hash(password, SALT_ROUNDS);

        return password;
    } catch (e) {
        throw { message: "Mật khẩu gia đình không hợp lệ!" };
    }
}

const checkRegister = async (name, image, password) => {
    try {
        name = await checkName(name);
        password = await checkPassword(password);

        try {
            image = await checkImage(image);
        } catch (e) {
            image = process.env.IMG_MOTEL_DEFAULT;
        }

        return { name, image, password };
    } catch (e) {
        console.log("ERROR: " + e);
        throw e;
    }
}

const checkEdit = async (name, image, password) => {
    try {
        name = await checkName(name);
        image = await checkImage(image);

        return { name, image };
    } catch (e) {
        console.log("ERROR: " + e);
        throw e;
    }
}

const checkChangePassword = async (mtID, oldPassword, newPassword) => {
    try {
        const motel = await Motel.findOne({ _id: mtID });
        const currentPassword = motel.password;
        const isMatch = await bcrypt.compare(oldPassword, currentPassword);

        if (isMatch) {
            if (oldPassword === newPassword) {
                throw { message: "Mật khẩu mới giống mật khẩu hiện tại!" };
            }

            if (newPassword.split(" ").length !== 1 || newPassword.length < 6) {
                throw { message: "Mật khẩu mới không hợp lệ!" };
            }
        }else{
            throw { message: "Mật khẩu hiện tại không đúng!" };
        }
    } catch (e) {
        console.log("ERROR: " + e);
        throw e;
    }
}

module.exports = {
    checkRegister,
    checkEdit,
    checkChangePassword
}