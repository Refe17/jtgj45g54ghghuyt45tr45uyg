const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const fs = require('fs');
const jimp = require('jimp');
const Canvas = require('canvas');

client.on('ready', () => {
    console.log(client.user.tag + ' Ready!');
});

client.on('guildMemberAdd', member => {
     member.guild.members.get(member.id).addRole(member.guild.roles.get('494159611767554058'));
     const welcomer =  member.guild.channels.find(c => c.id == '494165051490566176');
     const w = ['./welcome.png'];
 
         let Image = Canvas.Image,
            canvas = new Canvas(360, 270),
            ctx = canvas.getContext('2d');
            fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 360, 270);
             
         
 
                let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(100) + ".png" : member.user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
                       
                        ctx.font = "bold 14px Arial";
                        ctx.fontSize = '20px';
                        ctx.fillStyle = "#f1f1f1";
                        ctx.textAlign = "center";
                        ctx.fillText(member.user.username, 210, 200);
 
                let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                              ctx.arc(77, 145, 73, 0, Math.PI*2);
                              ctx.stroke();
                                 ctx.clip();
                                 ctx.drawImage(ava, 5, 70, 147, 147);
          welcomer.send({
              file: canvas.toBuffer()
          });
          })
      })
    });
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
            chat.send(`${member} Joined by **${inviter.tag}**.`).catch(err => console.log(err));
        });
});

client.login(process.env.BOT_TOKEN);
