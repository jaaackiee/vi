const { MessageActionRow, MessageButton } = require("discord.js");
const ticketCountSchema = require("../schemas/ticketCountSchema");
module.exports = async (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.channel.id !== "907815041674407965") return;

        const embed = {
            color: 0x2f3136,
            title: "ty for massing with xel !",
            description: ".mass to start"
        }

        let channelId;

        let count = await ticketCountSchema.findOne({
            _id: interaction.guild.id
        });

        count = count.count;
        
        if (parseInt(count) < 10) {
            count = "000" + count;
        } else if (parseInt(count) < 100) {
            count = "00" + count;
        } else if (parseInt(count) < 1000) {
            count = "0" + count
        }

        await interaction.guild.channels.create("ticket-" + count, {
            parent: "907815041850544129",
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL"]
                },
                {
                    id: interaction.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: "909914779190165504",
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        })
            .then((chnl) => {
                chnl.send({
                    custom: true,
                    content: "<@" + interaction.user.id + ">",
                    embeds: [embed]
                });

                chnl.setTopic(interaction.user.id);

                channelId = chnl.id
            })
            .catch((e) => {
                console.log(e);
            });

        await ticketCountSchema.findOneAndUpdate({
            _id: interaction.guild.id,
            $inc: {
                count: 1
            }
        })

        interaction.reply({
            custom: true,
            content: "channel created! <#" + channelId + ">",
            ephemeral: true
        });
    });
   
    client.on("messageCreate", (message) => {
        if (message.channel.id !== "907815041674407965") return;
        if (message.author.bot) return;

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

        return message.channel.send({
            custom: true,
            embeds: [embed],
            components: [row]
        });
    });
}
