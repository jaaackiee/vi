module.exports = (client) => {
    client.on("messageCreate", (message) => {
        if (message.channel.parentId === "907815041850544129") {
            return;
        }
        if (message.content.toLowerCase().contains("caitlyn")) {
            const embed = {
                color: 0x2f3136,
                title: "pls make embed @gav",
                description: "embedspls sefmoscmomaodcm em\nembed spldplpaplpslplsplsplspls#@xel@gavin@!gav\nin bed plsssplsplsplspl embed\n\n\n\n\n\n\nembd k"
            }

            return message.reply({
                custom: true,
                embeds: [embed]
            });
        }
    });
}