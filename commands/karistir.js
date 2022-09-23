module.exports = {
	name: "karıştır",
  aliases: ["karistir"],
	async run(client, message, args, player, embed) {
		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		queue.shuffle();

		return await message.reply({
			embeds: [embed(message.guild, message.author).setTitle("Sırayı karıştırdım!").setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJNnpHRsuaSJfLiovYqgMSbOyuputBCB6Vkw&usqp=CAU")]
		});
	}
};