module.exports = {
    expectedArgs: "<name>",
    minArgs: 1,
    modOnly: true,
    guildOnly: true,
    callback: (message, args, text) => {
        text = args.join("-")
        message.channel.setName(text)

        return {
            custom: true,
            content: "channel name changed to: <#" + message.channel.id + ">!",
            ephemeral: true
        }
    }
}