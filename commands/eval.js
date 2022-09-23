const {
	MessageEmbed
} = require('discord.js');
const config = require("../config.js")
const Discord = require("discord.js")

module.exports = {
	name: "eval",
  aliases: [],
	async run(client, message, args, player, embed) {
  if(message.author.id !== "429357746002067493" & message.author.id !== config.sahip) return
    if(!args.join(" ")) return message.channel.send("komutu girsene essek")
        try {
    let komut = eval(args.join(" "))
    if(!komut) return message.channel.send(new MessageEmbed().setDescription(` ${message.author}, Bir mesaj belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp())
    let Çıktılar = ["string","boolean","number","float"]
    if (Çıktılar.includes(typeof komut)) {
    let Embed = new MessageEmbed()
    .setDescription("**Başarılı**")
    .addField("Girdi", "```js\n" + args.join(" ") + "\n```")
    .addField("Çıktı", "```js\n" + komut + "\n```")
    .setColor('GREEN')
    message.channel.send({embeds: [Embed]})
    message.react('✅')
    } else {
    let Embed = new MessageEmbed()
    .setDescription("**Başarılı**")
    .addField("Girdi", "```js\n" + args.join(" ") + "\n```")
    .addField("Çıktı", "```js\n" + require('util').inspect(komut) + "\n```")
    .setColor('GREEN')
    message.channel.send({embeds: [Embed]})
    message.react('✅')
}
    } catch(err) {
     let embed = new MessageEmbed()
    .setDescription("**Hata**")
    .addField("Girdi", "```js\n" + args.join(" ") + "\n```")
    .addField("Çıktı", "```js\n" + err + "\n```")
    .setColor('RED')
    message.channel.send({embeds:  [embed]})
    message.react('❌')

    }
	}
};