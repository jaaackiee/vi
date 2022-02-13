module.exports = {
    expectedArgs: "<name>",
    minArgs: 1,
    modOnly: true,
    guildOnly: true,
    callback: (message, args, text) => {
        message.channel.setName(args.join("-"));
    }
}