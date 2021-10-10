module.exports = (client, msg, args) => {
    msg.room.send([
        `__**Help**__`,
        ``,
        `\`!meme\` - meme loool`,
        `\`!info house/user/bot\` - bot info`
    ].join('\n'))
}