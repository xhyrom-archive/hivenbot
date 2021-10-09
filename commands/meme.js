const hyttpo = require('hyttpo').default;

module.exports = async(client, msg, args) => {
    const api = (await hyttpo.get('https://api.hyrousek.tk/images/meme')).data;

    msg.room.send(api.url)
}