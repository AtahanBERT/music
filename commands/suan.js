const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "şuan",
  aliases: ["playing","suan"],
	async run(client, message, args, player, embed) {

		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		let emb;

		let track = queue.nowPlaying();
		if (track) emb = embed(queue.guild, track.requestedBy).setTitle("🎶 Çalıyor 🎶").setFooter({
			text: `${queue.createProgressBar()}`
		}).addField("İsim", `[${track.title}](${track.url})`, true).addField("Yayınlayan", `${track.author}`, true).addField("İzlenme", `${track.views}`, true).setImage(`${track.thumbnail}`);
		else emb = embed(queue.guild, track.requestedBy).setDescription("Şuanda çalan bir **şarkı** yok!");


		return await message.reply({
			embeds: [emb]
		});

	}
};