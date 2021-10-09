module.exports = (client, msg, args) => {
    msg.room.send([
        `__**Help**__`,
        ``,
        `\`!meme\` - meme loool`,
        `\`!info\` - bot info`
    ].join('\n'))
}