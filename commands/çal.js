module.exports = {
	name: "çal",
  aliases: ["p","play","oynat","o"],
	async run(client, message, args, player, embed) {


		let queue = player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		try {
			if (!queue.connection) await queue.connect(message.member.voice.channel);
		} catch {
			queue.destroy();
			return await message.reply({
				embeds: [embed(message.guild, message.author).setColor("RED").setTitle("Bulunduğun kanala katılamıyorum!")],
				ephemeral: true
			});
		};

if (!args.join(" ")) return
    
    let track = await player.search(args.join(" "), {
			requestedBy: message.author
		})

let emb1 = embed(message.guild, message.author);
    
  if (!track) {emb1 = emb1.setDescription(`**${name}** Bu isimde bir şarkı bulamadım!`); 
  await message.reply({
			embeds: [emb1],
      ephemeral: true
		});}

if (!track.playlist) {

		let emb = embed(message.guild, message.author);
   track = track.tracks
    
		
		emb = emb.setTitle("➕ Şarkı Eklendi ➕").addField("İsim", `[${track[0].title}](${track[0].url})`, true).addField("Yayınlayan", `${track[0].author}`, true).addField("İzlenme", `${track[0].views}`, true).addField("Süre", `${track[0].duration}`, true).setImage(`${track[0].thumbnail}`);
   await message.reply({
			embeds: [emb]
		});
		queue.addTrack(track[0]);}
    else if (track.playlist) {		let emb = embed(message.guild, message.author);

    //let parça = track.playlist.tracks.filter((muzik) => muzik.url.includes("track")).map((muzik) => {return (song = {
         // title: muzik.title,
         // url: muzik.url,
         // duration: muzik.duration,
          //thumbnail: muzik.thumbnail,
          //author: muzik.author
        //});})
                              
		//console.log(parça)
		emb = emb.setTitle("➕ Playlist Eklendi ➕").addField("İsim", `[${track.playlist.title}](${track.playlist.url})`, true).addField("Sahibi", `[${track.playlist.author.name}](${track.playlist.author.url})`, true).addField("Türü", `${track.playlist.source}`, true).addField("Şarkılar", `${track.playlist.tracks.length}`, true).setImage(`${track.playlist.thumbnail}`);
     await message.reply({
		embeds: [emb]
		});
		queue.addTracks(track.playlist.tracks)}

    if (!queue.playing) return queue.play()
    
		

	}
};