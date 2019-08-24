const axios = require("axios");
const Dev = require("../model/Dev")

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.deslikes } },
            ],
        });

        return res.json(users);
    },
    async store(req, res) {

        const { username } = req.body;

        // tratando se o usuário já existe
        const userExists = await Dev.findOne({ user: username })

        if (userExists) {
            return res.json(userExists);
        }

        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);

            const { name, bio, avatar_url: avatar } = response.data;

            const dev = await Dev.create({
                name,
                user: username,
                bio,
                avatar
            });

            return res.json(dev);

        } catch (error) {
            return res
                .status(400)
                .json({ erro: error.message });
        }
    }
};