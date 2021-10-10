require('dotenv').config();
const { Client } = require('hiven');
const client = new Client({ type: 'user' });
const fs = require('fs');
const prefix = '!';
const cooldown = new Map();

client.on('init', () => {
    console.log("[BOT] Bot is ready!")
});

client.on('message', (msg) => {
    if(!msg.content.startsWith(prefix)) return;

    const cldwn = cooldown.get(msg.author?.id);

    if (msg.author && Date.now() < cldwn) return;
    if(msg.author) cooldown.set(msg.author.id, Date.now() + 10000);

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if (!(command.match(/^[0-9a-zA-Z]+$/))) return;
  
    const file = `${__dirname}/commands/${command}.js`;
  
    if (fs.existsSync(file)) {
      try {
        (require(file))(client, msg, args);
      } catch(err) {
        console.log(err);
      }
    }
});

client.connect(process.env.sfe)