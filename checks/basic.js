
const formatString = (s) => {
    try {
        const temps = s.split(" ");
        let res = "";
        const l = temps.length - 1;
        let i = 0;

        for (i = 0; i < l; i++) {
            if (temps[i].length) {
                res = res.concat(temps[i]);
                res = res.concat(" ");
            }
        }

        res = res.concat(temps[i])

        return res;
    } catch (e) {
        console.log("ERROR format string: " + e);
        throw e;
    }
}

const checkImage = async (image) => {
    try {
        image = image.trim();

        if (image && image.split(" ").length > 1 || image.length < 1) {
            throw "Hình ảnh không hợp lệ!";
        }

        return image;
    } catch (e) {
        console.log("ERROR checks\basic\checkImage: " + e);
        throw e;
    }
}

module.exports = {
    formatString,
    checkImage
}