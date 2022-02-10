module.exports = {
    guildOnly: true,
    callback: (message, args, text) => {
        const embed = {
            color: 0x2f3136,
            title: "⨳",
            description: "\`☆\`﹒ ss post last\n｡ sep or batch? (max 7 hours)\n\`☆\`﹒ will post soon◞",
            footer: {
                text: "ᶻz"
            },
            thumbnail: {
                url: "attachment://done.png"
            }
        }

        const massing = message.guild.roles.cache.get("908100523448758312");
        message.member.roles.remove(massing);

        const massed = message.guild.roles.cache.get("908102231620997131");
        message.member.roles.add(massed);

        return {
            custom: true,
            content: "<@&909906991462354944>",
            embeds: [embed],
            files: [
                {
                    attachment: "images/vi_done.png",
                    name: "done.png"
                }
            ]
        }
    }
}