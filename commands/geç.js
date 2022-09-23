module.exports = {
	name: "geç",
  aliases: ["skip"],
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

		let nowTrack = queue.nowPlaying();
		queue.skip();

		return await message.reply({
			embeds: [embed(message.guild, message.author).setDescription(`**[${nowTrack.title}](${nowTrack.url})** adlı şarkıyı geçtim!`).setThumbnail("https://www.shareicon.net/data/2016/11/14/852045_right_512x512.png")]
		});

	}
};