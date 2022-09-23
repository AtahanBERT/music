const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	ms2time
} = require("ms2time");

module.exports = {
	name: "sıra",
  aliases: ["queue"],
	async run(client, message, args, player, embed) {

		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		let queueText = "";

		if (queue.tracks.length == 0) queueText = "Sırada hiç şarkı yok! ";
		else
			for (let t of queue.tracks) {
				let i = queue.tracks.indexOf(t);

				queueText += `**${i +1 }.** ${t.title}\n`
			};


		return await message.reply({
			embeds: [embed(message.guild, message.author).setTitle(" Sıra ").setDescription(`${queueText}`).setFooter({
				text: `${ms2time(queue.totalTime,"tr")}`
			})]
		});

	}
};