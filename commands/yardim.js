const config = require("../config.js")

module.exports = {
	name: "yardım",
  aliases: ["help","yardim"],
	async run(client, message, args, player, embed) {

let prefix = config.prefix
    
		await message.reply({
			embeds: [embed(message.guild, message.author).setAuthor({name: message.guild.name, icon_url:message.guild.iconURL({dynamic: true})}).setDescription(`Komutlar: çal, atla, devam, durdur, geç, geri, kaldir, kapat, karistir, sarki-atla, ses, sira, suan, tekrar, toplu-geç`).setFooter("Atahan").setTitle(`Prefix: ${prefix}`)]
		});
    
  }}