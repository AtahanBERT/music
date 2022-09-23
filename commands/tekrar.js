module.exports = {
	name: "tekrar",
  aliases: ["loop"],
	async run(client, message, args, player, embed) {
		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		let text;

		if(queue.repeatMode) {
			text = "Tekrarlama modunu kapattım!";
			queue.setRepeatMode(0);
		}
		else {
			text = "Tekrarlama modunu açtım!";
			queue.setRepeatMode(2);
		};

		

		return await message.reply({
			embeds: [embed(message.guild, message.author).setTitle(`${text}`).setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpUQquonuPTFmpnDQMMWl4rm8npwTyeHgcA&usqp=CAU")]
		});
	}
};