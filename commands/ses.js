const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "ses",
  aliases: ["volume"],
	async run(client, message, args, player, embed) {

		let value = args[0]

		if (isNaN(value)) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle("Lütfen sayı girin!")]
		});

		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		queue.setVolume(value);

		await message.reply({
			embeds: [embed(message.guild, message.author).setTitle(`Ses ${value} olarak ayarlandı!`).setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5mKjOY5FPlDgrffJo-tiuxtQVazWol8ipA&usqp=CAU")]
		});
	}
};