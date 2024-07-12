const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const BCRYPT_SALTS = parseInt(process.env.BCRYPT_SALTS);


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(BCRYPT_SALTS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
