module.exports = {
	name: "şarkı-atla",
  aliases: ["song-jump","skatla"],
	async run(client, message, args, player, embed) {

		let şarkı = args[0]

		if (isNaN(şarkı)) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle("Bir sayı girin!")],
			ephemeral: true
		});


		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		if (şarkı > queue.tracks.length || şarkı <= 0) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle("Girdiğiniz sayıda bir şarkı yok!")],
			ephemeral: true
		});


		let removedTrack = queue.tracks[şarkı - 1];
		queue.jump(removedTrack);

		return await message.reply({
			embeds: [embed(message.guild, message.author).setDescription(`**[${removedTrack.title}](${removedTrack.url})** adlı şarkıya atladım!`)]
		});

	}
};