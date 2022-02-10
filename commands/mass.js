module.exports = {
    guildOnly: true,
    callback: (message, args, text) => {
        const embed = {
            color: 0x2f3136,
            title: "ˊᵕˋ",
            description: "\`☆\`﹒send ad(s) in cb .ᐟ\n｡ post b2t & take ur time\n\`☆\`﹒**.done** when done",
            footer: {
                text: "ᶻz"
            },
            thumbnail: {
                url: "attachment://mass.png"
            }
        }

        const massing = message.guild.roles.cache.get("908100523448758312");
        message.member.roles.add(massing);

        return {
            custom: true,
            content: "<@&909906991462354944>",
            embeds: [embed],
            files: [
                {
                    attachment: "images/vi_mass.png",
                    name: "mass.png"
                }
            ]
        }
    }
}