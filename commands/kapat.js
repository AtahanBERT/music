module.exports = {
	name: "kapat",
  aliases: ["leave","stop"],
	async run(client, message, args, player, embed) {

    let queue = player.getQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});
    
      queue.destroy(true);

		await message.reply({
			embeds: [embed(message.guild, message.author).setTitle("Sırayı sildim ve sesten çıktım!").setThumbnail("https://rukminim2.flixcart.com/image/416/416/kbb49zk0/poster/8/k/x/large-exit-sign-poster-rit-86-original-imafszfjghvms6n6.jpeg?q=70")]
		});

//message.edit({components: []})
    
	}
};