module.exports = {
	name: "atla",
  aliases: ["seek"],
	async run(client, message, args, player, embed) {


		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		if (!queue.nowPlaying()) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setDescription("Şuanda çalan bir **şarkı** yok!")],
			ephemeral: true
		});

		let time = args[0]

		if (!time.includes(":") || !time) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle("Örnek kullanım => '1:24'")],
			ephemeral: true
		});
    
		let min = time.split(":")[0].split(" ")[time.split(":")[0].split(" ").length - 1];
		let sec = time.split(":")[1].split(" ")[0];
		let trackDuration = queue.nowPlaying().duration;

		if (!min || !sec || isNaN(min) || isNaN(sec)) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle("Örnek kullanım => '1:24'")],
			ephemeral: true
		});

		sec = parseInt(sec);
		min = parseInt(min);

		if (sec >= 60) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle("Saniye 60'tan küçük olmalı!")],
			ephemeral: true
		});

		if (min > parseInt(trackDuration.split(":")[0])) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle(`Şarkının uzunluğu => ${trackDuration}`)],
			ephemeral: true
		});

		if (min == parseInt(trackDuration.split(":")[0]) && sec > parseInt(trackDuration.split(":")[1])) return await message.reply({
			embeds: [embed(message.guild, message.author).setColor("RED").setTitle(`Şarkının uzunluğu => ${trackDuration}`)],
			ephemeral: true
		});

		let t = 0;

		t += min * 60000;
		t += sec * 1000;

		queue.seek(t);

		return await message.reply({
			embeds: [embed(message.guild, message.author).setTitle(`Şarkının ${time} kısmına atladım!`)]
		});
	}
};