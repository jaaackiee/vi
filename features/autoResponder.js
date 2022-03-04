module.exports = (client) => {
    client.on("messageCreate", (message) => {
        if (message.channel.parentId !== "907815041850544129") {
            return;
        }

        if (message.content.toLowerCase().includes("caitlyn")) {
            const embed = {
                color: 0x2f3136,
                description: "ty for not scamming <#941080786893959209>"
            }

            return message.reply({
                custom: true,
                embeds: [embed]
            });
        }
    });
}
