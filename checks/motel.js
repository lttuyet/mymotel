const bcrypt = require("bcrypt");
const SALT_ROUNDS = 9;
const { formatString } = require('./basic');

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

const checkRegister = async (name, password) => {
    try {
        name = await checkName(name);
        password = await checkPassword(password);

        return { name, password };
    } catch (e) {
        console.log("ERROR: " + e);
        throw e;
    }
}

module.exports = {
    checkRegister
}