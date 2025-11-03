const mongoose = require("mongoose");

const connectDB = async () => {
	const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sbitbot';
	try {
		await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log('Mongoose connected');
	} catch (err) {
		console.error('Failed to connect to MongoDB', err);
		throw err;
	}
};

module.exports = connectDB;