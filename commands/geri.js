module.exports = {
	name: "geri",
  aliases: ["back"],
	async run(client, message, args, player, embed) {

		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		if (queue.previousTracks.length == 0) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle("Bu komudu kullanman için bir şarkı çalıyor olması gerek!")],
			ephemeral: true
		});

		let nowTrack = queue.previousTracks
		queue.back();

		return await message.reply({
			embeds: [embed(message.guild, message.author).setDescription(`**[${nowTrack.title}](${nowTrack.url})** adlı şarkıya geçtim!`).setThumbnail("https://www.shareicon.net/data/2016/11/14/852045_right_512x512.png")]
		});

	}
};