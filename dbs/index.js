const mongoose = require("mongoose");

mongoose.Promise = Promise;

const option = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}

const connectDB = async() => {
	try {
		await mongoose.connect(process.env.CONNECT_STRING, option, function(err) {
			if (err) {
				return console.log(err);
			}
			
			console.log("Connection DB is successed");
		})
	} catch (error) {
		return console.log(error);
	}
}

module.exports = connectDB;