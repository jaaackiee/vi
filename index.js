const djs = require("discord.js");
const runFeatures = require("./util/runFeatures");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const client = new djs.Client({
    intents: [
        djs.Intents.FLAGS.GUILDS,
        djs.Intents.FLAGS.GUILD_MESSAGES,
        djs.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        djs.Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials: [
        "MESSAGE",
        "CHANNEL",
        "REACTION"
    ]
});

client.on("ready", () => {
    client.user.setActivity(".mass");
    console.log("MESSAGE > Ready!");

    try {
        mongoose.connect(process.env.MONGO_PATH, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MESSAGE > Connected to MongoDB!");
    } catch(e) {
        const jackie = client.users.cache.get("326645430089941030");
        jackie.send({
            custom: true,
            content: "Could not connect to database!\n\`\`\`st\n" + e + "\n\`\`\`"
        });
    }

    runFeatures(client);
});

client.login(process.env.TOKEN);