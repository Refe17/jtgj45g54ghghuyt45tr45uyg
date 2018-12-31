const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const fs = require('fs');
const jimp = require('jimp');
const Canvas = require('canvas');

client.on('ready', () => {
    console.log(client.user.tag + ' Ready!');
    client.user.setActivity('Black Shop.', {
        type: "STREAMING",
        url: "https://www.twitch.tv/blackshop"
    });
});

client.on('guildMemberAdd', member => {
     member.guild.members.get(member.id).addRole(member.guild.roles.get('494159611767554058'));
     const welcomer =  member.guild.channels.find(c => c.id == '494165051490566176');
     const w = ['./welcome (1).png'];
    if(!welcomer) return;
 
         let Image = Canvas.Image,
            canvas = new Canvas(475, 270),
            ctx = canvas.getContext('2d');
            fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 475, 270);
             
         
 
                let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(100) + ".png" : member.user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
                       
                        ctx.font = "bold 16px Arial";
                        ctx.fontSize = '20px';
                        ctx.fillStyle = "#f1f1f1";
                        ctx.textAlign = "center";
                        ctx.fillText(member.user.username, 330, 140);
 
                let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                              ctx.arc(107, 130, 102, 0, Math.PI*2);
                              ctx.stroke();
                                 ctx.clip();
                                 ctx.drawImage(ava, 6, 25, 210, 210);
          welcomer.send({
              file: canvas.toBuffer()
          });
          })
      })
    });
});

client.on('message', message => {
    
    var args = message.content.toLowerCase().split(' ');
    var command = args[0];
    var prefix = '_';
    
    if(command == prefix + 'setplay') {
        if(message.author.id !== '346066545107009537') return err(message, "Only ReFe can use this command.");
        args = message.content.split(' ').slice(1).join(' ');
		if(!args) return err(message, "Please type the word to set.");
		if(args.length < 1 || args.length > 50) return err(message, "The words only between 1 to 50 characters.");
		message.delete();
		client.user.setActivity(args, {
			type: "PLAYING"
		});
		suc(message, `Successfully set (Playing) to (${args}).`);
    }
	
    if(command == prefix + 'setlisten') {
        if(message.author.id !== '346066545107009537') return err(message, "Only ReFe can use this command.");
        args = message.content.split(' ').slice(1).join(' ');
		if(!args) return err(message, "Please type the word to set.");
		if(args.length < 1 || args.length > 50) return err(message, "The words only between 1 to 50 characters.");
		message.delete();
		client.user.setActivity(args, {
			type: "LISTENING"
		});
		suc(message, `Successfully set (Listening) to (${args}).`);
    }
	
    if(command == prefix + 'setwatch') {
        if(message.author.id !== '346066545107009537') return err(message, "Only ReFe can use this command.");
        args = message.content.split(' ').slice(1).join(' ');
		if(!args) return err(message, "Please type the word to set.");
		if(args.length < 1 || args.length > 50) return err(message, "The words only between 1 to 50 characters.");
		message.delete();
		client.user.setActivity(args, {
			type: "WATCHING"
		});
		suc(message, `Successfully set (Watching) to (${args}).`);
    }
	
	if(command == prefix + 'setstream') {
        if(message.author.id !== '346066545107009537') return err(message, "Only ReFe can use this command.");
        args = message.content.split(' ').slice(1).join(' ');
		if(!args) return err(message, "Please type the word to set.");
		if(args.length < 1 || args.length > 50) return err(message, "The words only between 1 to 50 characters.");
		message.delete();
		client.user.setActivity(args, {
			type: "STREAMING",
            url: "https://www.twitch.tv/blackshop"
		});
		suc(message, `Successfully set (Streaming) to (${args}).`);
	}
});

const invites = {};
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
        wait(1000);
        client.guilds.forEach(g => {
                g.fetchInvites().then(guildInvites => {
                        invites[g.id] = guildInvites;
                });
        });
});
client.on('guildMemberAdd', member => {
        member.guild.fetchInvites().then(guildInvites => {
            var ei = invites[member.guild.id];
            invites[member.guild.id] = guildInvites;
            var invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
            var inviter = client.users.get(invite.inviter.id);
            var chat = member.guild.channels.get('494165051490566176');
            chat.send(`${member} Joined, Invited by **${inviter.tag}**.`).catch(err => console.log(err));
        });
});

function err(message, args) {
    var err = new Discord.RichEmbed()
    .setAuthor(args, "https://tse1.mm.bing.net/th?id=OIP.J-y_zWr6CiYBywhxuhKOVAHaHa&pid=15.1&P=0&w=300&h=300")
    .setColor('RED');
    message.channel.send({
        embed: err
    });
}
function suc(message, args) {
    var suc = new Discord.RichEmbed()
    .setAuthor(args, "https://media3.picsearch.com/is?yYyH6QeF4vRyybuH60KCypFS9-Hs1BdhfebbWj6OhyI&height=340")
    .setColor('GREEN');
    message.channel.send({
        embed: suc
    });
}

client.login(process.env.BOT_TOKEN);
