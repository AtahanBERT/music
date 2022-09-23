module.exports = {
	name: "kaldır",
  aliases: ["kaldir","remove"],
	async run(client, message, args, player, embed) {

		let number = args[0]

		if (isNaN(number)) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle("Bir sayı girin!")],
			ephemeral: true
		});


		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		if (number > queue.tracks.length || number <= 0) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle("Girdiğiniz sayıda bir şarkı yok!")],
			ephemeral: true
		});


		let removedTrack = queue.tracks[number - 1];
		queue.remove(removedTrack);

		return await message.reply({
			embeds: [embed(message.guild, message.author).setDescription(`**[${removedTrack.title}](${removedTrack.url})** adlı şarkı sıradan kaldırıldı!`)]
		});

	}
};