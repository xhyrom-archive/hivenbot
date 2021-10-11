require('dotenv').config();
const { Client } = require('hiven');
const client = new Client({ type: 'user' });
const fs = require('fs');
const hyttpo = require('hyttpo').default;
const prefix = '!';
const cooldown = new Map();

client.on('init', async() => {
    console.log("[BOT] Bot is ready!")

    /*hyttpo.post({
      url: 'https://api.hiven.io/v1/rooms/299117991910439645/call',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': client.token
      }
    })

    let voice = await client.rooms.get('299117991910439645').join();*/
});

client.on('RAW', async(r) => {
  if(r.event === 'RELATIONSHIP_UPDATE' && r.data.type === 2) {
    await hyttpo.request({
      method: "POST",
      url: "https://api.hiven.io/v1/relationships/@me/friend-requests",
      headers: {
        'Authorization': client.token,
        'Content-Type': 'application/json'
      },
      body: {
        user_id: r.data.user.id
      }
    }).catch(e => e)
  }
})

client.on('house_member_join', (member) => {
  client.rooms.get('299111108394875159').send(`Welcome <@${member.user.id}> ${member.user.name}`);
})

client.on('message', async(msg) => {
    if(msg.room.id !== '298900138657577806') return;
    if(!msg.content.startsWith(prefix)) return;

    if(!msg.author) msg.author = await client.users.resolve(msg.author_id);

    const cldwn = cooldown.get(msg.author?.id);

    if (Date.now() < cldwn) return;
    cooldown.set(msg.author.id, Date.now() + 10000);

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