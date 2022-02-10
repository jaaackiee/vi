const getFiles = require("../util/getFiles");
module.exports = (client) => {
    const commands = {};

    const commandFiles = getFiles(__dirname + "/../commands", ".js");

    let commandOptions = {};

    for (const commandFile of commandFiles) {
        let command = require(commandFile);

        if (command.default) {
            command = command.default;
        }

        /**
         * Replaces each '\' in the commandFile path with '/' for operating system parity
         * Splits the commandFile path into each directory on '/'
         * Defines the command's name as the last file in the path (the command file)
         * 
         * @example 
         * "commands/cute/cat.js" -> ["commands", "cute", "cat.js"] -> "cat"
         */
        const split = commandFile.replace(/\\/g, "/").split("/");
        const commandName = split[split.length - 1].replace(".js", "");

        commands[commandName.toLowerCase()] = command;

        commandOptions[commandName] = require(commandFile);
        let {
            expectedArgs = "",
            minArgs = 0,
            maxArgs = -1,
            hidden = false,
            modOnly = false,
            ownerOnly = false,
            guildOnly = false
        } = commandOptions[commandName.toLowerCase()];
        

        if (typeof(expectedArgs) !== "string") throw new Error("expectedArgs must be a string!");
        if (minArgs < 0 || typeof(minArgs) !== "number") throw new Error("minArgs must be a number >= 0!");
        if (typeof(maxArgs) !== "number") throw new Error("maxArgs must be a number!");
        if (typeof(hidden) !== "boolean") throw new Error("hidden must be a boolean!");
        if (typeof(modOnly) !== "boolean") throw new Error("modOnly must be a boolean!");
        if (typeof(ownerOnly) !== "boolean") throw new Error("ownerOnly must be a boolean!");
        if (typeof(guildOnly) !== "boolean") throw new Error("guildOnly must be a boolean!");
    }

    console.log("MESSAGE > Loaded " + Object.keys(commands).length + " commands!");

    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) {
            return;
        }

        /**
         * Slices off the first character of the message (the prefix)
         * Splits the message on ' ', using RegEx to account for multiple spaces
         * Defines the command's name as args[0]
         * Removes args[0]
         *
         * @example
         * ".ban @user rule breaker" -> "ban @user rule breaker" -> ["ban", "@user", "rule", "breaker"] -> ["@user", "rule", "breaker"]
         */
        const args = message.content.slice(1).split(/[ ]+/);
        const commandName = args.shift().toLowerCase();

        if (!commands[commandName]) {
            return;
        }

        let options = commandOptions[commandName];

        if (args.length < options.minArgs) {
            return message.reply({
                custom: true,
                content: "Incorrect syntax! Try \`" + process.env.PREFIX + commandName + " " + options.expectedArgs + "\`"
            });
        }

        if (options.maxArgs >= 0 && args.length > options.maxArgs) {
            return message.reply({
                custom: true,
                content: "Incorrect syntax! Try \`" + process.env.PREFIX + commandName + " " + options.expectedArgs + "\`"
            });
        }

        if (options.modOnly && !message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply({
                custom: true,
                content: "Only moderators can execute that command!"
            });
        }

        if (options.ownerOnly && message.author.id !== "326645430089941030") {
            return message.reply({
                custom: true,
                content: "Only the bot owner can execute that command!"
            });
        }

        if (options.guildOnly && message.channel.type === "DM") {
            return message.reply({
                custom: true,
                content: "That command cannot be executed in a DM!"
            });
        }

        try {
            const execute = await commands[commandName].callback(message, args, args.join(" "));
            message.reply(execute);
        } catch(e) {
            if (message.channel.type === "DM") {
                return console.log(e);
            }

            const jackie = client.users.cache.get("326645430089941030");
            jackie.send({
                custom: true,
                content: "https://discord.com/channels/" + message.guild.id + "/" + message.channel.id + "/" + message.id + "\n\`\`\`st\n" + e + "\n\`\`\`"
            });
        }
    });
}