module.exports = {
    expectedArgs: "<name>",
    minArgs: 1,
    modOnly: true,
    guildOnly: true,
    callback: async (message, args, text) => {
        text = args.join("-")
        await message.channel.setName(text)

        return {
            custom: true,
            content: "channel name changed to: <#" + message.channel.id + ">!",
            ephemeral: true
        }
    }
}