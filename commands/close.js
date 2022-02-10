module.exports = {
    expectedArgs: "[reason]",
    guildOnly: true,
    callback: (message, args, text) => {
        if (message.channel.parentId !== "907815041850544129") {
            return {
                custom: true,
                content: "This channel is not a ticket!"
            }
        }

        setTimeout(function() {
            message.channel.delete();
        }, 10000);

        const user = message.client.users.cache.get(message.channel.topic);
        user.send({
            custom: true,
            content: "Your ticket has been closed!\n\`\`\`" + text + "\`\`\`"
        });

        return {
            custom: true,
            content: "Thanks for massing! This ticket will be closing in 10 seconds."
        }
    }
}