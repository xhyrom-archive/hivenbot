const moment = require('moment');
module.exports = async(client, msg, args) => {
    if(args[0] === 'house') {
        moment.locale('cs');
        msg.room.send([
            `__**${msg.house.name}'s Info**__`,
            `\`\`\`toml`,
            `[ Informations ]`,
            `    Name: ${msg.house.name}`,
            `    Id: ${msg.house.id}`,
            `    Owner: ${msg.house.owner.name}`,
            `    Icon: ${msg.house.icon}`,
            `    Banner: ${msg.house.banner}`,
            `    Synced: ${msg.house.synced ? 'Yes': 'No'}`,
            `    Members: ${msg.house.members.size}`,
            `    Rooms: ${msg.house.rooms.size}`,
            `    Created At: ${msg.house?.created ? `${moment.locale()} ${moment(msg.house?.created).format('DD/MM/YYYY, hh:mm:ss')}` : "undefined"}`,
            `\`\`\``
        ].join('\n'))
    } else if(args[0] === 'user') {
        moment.locale('cs');

        if(!msg.author) msg.author = await client.users.resolve(msg.author_id);
        await msg.house.members.collect();

        msg.room.send([
            `__**${msg.author.name}'s Info**__`,
            `\`\`\`toml`,
            `[ Informations ]`,
            `    Name: ${msg.author.name}`,
            `    Username: ${msg.author.usernname}`,
            `    Id: ${msg.author.id}`,
            `    Bot: ${msg.author.bot ? 'Yes' : 'No'}`,
            `    Icon: ${msg.author.icon}`,
            `    Banner: ${msg.author.header}`,
            `    Flags: ${msg.author.flags} *(Zatial je to bitfield lebo neviem ake su flags)*`,
            `    Created At: ${msg.author?.created ? `${moment.locale()} ${moment(msg.author?.created).format('DD/MM/YYYY, hh:mm:ss')}` : "undefined"}`,
            `\`\`\``
        ].join('\n'))
    } else {
        msg.room.send([
            `__**Info**__`,
            ``,
            `Beta Hiven (self)bot.`,
            `Github: https://github.com/Garlic-Team/hivenbot`,
            `SFE: https://hiven.house/CvdBW9`
        ].join('\n'))
    }
}