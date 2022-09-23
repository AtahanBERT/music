module.exports = {
	name: "durdur",
  aliases: ["pause"],
	async run(client, message, args, player, embed) {

		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		queue.setPaused(true);

		await message.reply({
			embeds: [embed(message.guild, message.author).setTitle("Durduruldu!").setThumbnail("https://cdn2.iconfinder.com/data/icons/control-button/64/pause-resume-button-interface-512.png")]
		});
	}
};