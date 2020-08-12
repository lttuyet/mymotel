const { formatString, checkImage } = require('./basic');
const Member = require('../models/members');

const checkName = async (name) => {
    try {
        name = await formatString(name);

        return name;
    } catch (e) {
        console.log("ERROR: " + e);
        throw { message: "Tên thành viên không hợp lệ!" };
    }
}

const checkEmail = async (email) => {
    try {
        email = email.trim();
        email = email.toLowerCase();

        if (email.split(" ").length !== 1) {
            throw { message: "Email không hợp lệ!" };
        }

        const member = await Member.findOne({ email });

        if (member) {
            throw { message: "Email đã tồn tại!" };
        }

        return email;
    } catch (e) {
        console.log("ERROR: " + e);
        throw e;
    }
}

const checkRegister = async (name, image, email) => {
    try {
        name = await checkName(name);
        email = await checkEmail(email);

        try {
            image = await checkImage(image);
        } catch (e) {
            image = process.env.IMG_MEMBER_DEFAULT;
        }

        return { name, email, image };
    } catch (e) {
        console.log("ERROR: " + e);
        throw e;
    }
}

module.exports = {
    checkRegister
}