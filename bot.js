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
     const welcomer =  member.guild.channels.find(c => c.id == '515164892223897601');
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
                              ctx.arc(77, 101, 62, 0, Math.PI*2);
                              ctx.stroke();
                                 ctx.clip();
                                 ctx.drawImage(ava, 0, 50, 150, 200);
          welcomer.send({
              file: canvas.toBuffer()
          });
          })
      })
    });                    
});

client.login(process.env.BOT_TOKEN);
