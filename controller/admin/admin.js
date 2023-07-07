const redcap = require("../../models/redcap");
const User = require("../../models/user")
const { sign } = require('jsonwebtoken')

module.exports = {
    async signup(req, res) {
        const { firstName, lastName, userName, email, password } = req.body;
        try {
            User.findOne({ email: email }).exec(async (user, error) => {
                if (user) {
                    return res.status(400).send({ message: "Admin already registered" });
                }

                const userCollection = await User.create({
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    email: email,
                    password: password,
                    role: "admin"
                });

                if (userCollection) {
                    res.status(200).send({ message: "Admin created Successfully..!" })
                } else {
                    res.status(404).send('Something Went Wrong')
                }
            })
        } catch (error) {
            res.status(500).send(error)
        }
    },

    async signin(req, res) {
        const { email } = req.body
        try {
            const userCollection = await User.findOne({ email: email });
            if (userCollection) {
                const { _id, firstName, lastName, email, role, userName, password } = userCollection;
                if (password === req.body.password) {
                    if (role === "admin" || role === "super-admin") {
                        const token = sign({ id: _id, role: role }, process.env.JWT_SECRET, { expiresIn: "1d" });
                        res.status(200).send({
                            token,
                            user: { _id, firstName, lastName, email, role, userName },
                        });
                    } else {
                        res.status(400).send({ message: 'Invalid Role ! Check API Path' })
                    }

                } else {
                    res.status(400).send({ message: 'Please Enter Valid Password' })
                }
            } else {
                res.status(400).send({ message: 'User Not Found' })
            }
        } catch (error) {
            res.status(404).send(error)
        }
    },

    signout(req, res) {
        res.status(200).send({
            message: "Signout successfully...!",
        });
    },


    async getToken(req, res) {
        const { id } = req.user;
        const red_cap_token = await redcap.findOne({ userId: id });
        if (red_cap_token) {
            res.status(200).send({ red_cap_token })
        } else {
            res.status(400).send({ message: 'No Record Found' })
        }
    },


    async addToken(req, res) {
        const { id } = req.user;
        const { token } = req.body;
        try {
            const tokenObj = {
                redcaptoken: token, createdBy: id, userId: id,
            }
            const red_cap = await redcap.create(tokenObj)
            if (red_cap) {
                res.status(200).send({ red_cap })
            } else {
                res.status(400).send({ message: 'Something Went Wrong' })
            }
        }
        catch (error) {
            res.status(500).send(error)
        }
    },
}
