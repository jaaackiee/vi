const { MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    ownerOnly: true,
    callback: (message, args, text) => {
        const button = new MessageButton()
            .setCustomId("mass")
            .setLabel("﹒mass")
            .setStyle("SECONDARY")
            .setEmoji("🧁");

        const row = new MessageActionRow()
            .addComponents(button);
            
        const embed = {
            color: 0x2f3136,
            title: "﹒mass",
            description: "react 2 mass"
        }

        return {
            custom: true,
            embeds: [embed],
            components: [row]
        }
    }
}