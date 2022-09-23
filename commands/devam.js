module.exports = {
	name: "devam",
  aliases: ["resume"],
	async run(client, message, args, player, embed) {

		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		queue.setPaused(false);

		await message.reply({
			embeds: [embed(message.guild, message.author).setTitle("Devam ediyor!").setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtfiF5MbtzvGFNBBQsSXDdsYW4noepo2NU7E4K8mm4rOApY-EVQqnZ8TqYLhGPalh5Nb4&usqp=CAU")]
		});
	}
};