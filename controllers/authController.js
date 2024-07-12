const User = require('../Models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        console.log('Invalid credentials'); // Debug log
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ success: true, token });
};
