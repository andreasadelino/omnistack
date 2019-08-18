const { Schema, model } = require("mongoose")

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "Dev"
    }],
    deslikes: [{
        type: Schema.Types.ObjectId,
        ref: "Dev"
    }]
}, {
        // cria uma coluna createdAt e uma updatedAt na estrutura
        timestamps: true,
    });

module.exports = model("Dev", DevSchema);