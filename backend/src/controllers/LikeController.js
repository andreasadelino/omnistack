const Dev = require("../model/Dev")

module.exports = {
    async store(req, res) {
        // console.log(req.params.devId);
        // console.log(req.headers.user);

        const { devId } = req.params;
        const { user } = req.headers;

        if (devId === user) {
            return res.status(400).json({ error: "Users are the same!" });
        }

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        console.log(loggedDev._id);
        console.log(targetDev._id);

        if (!targetDev) {
            return res.status(400).json({ error: "Dev not exists!" });
        }

        if (!loggedDev.likes.includes(targetDev._id)) {
            loggedDev.likes.push(targetDev._id);
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log("Deu match!");
        }

        await loggedDev.save();

        // todo: implementar o alerta de match

        return res.json(loggedDev);
    }
}