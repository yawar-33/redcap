const isSignInRequestValidated = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Enter Email' })
    }

    next();
}

module.exports = { isSignInRequestValidated }