const { EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  description: 'Check the current song playing',
  usage: 'nowplaying',
  category: 'Music',
  inVoiceChannel: true,
  usableInDms: false,
  async execute(message, client, args) {
    const queue = client.distube.getQueue(message)

    const embed = new EmbedBuilder()
      .setColor(client.config.embedMusic)
      .setDescription(`${client.config.musicEmojiError} | There is **nothing** in the queue right now!`)

    if (!queue) return message.channel.send({ embeds: [embed], flags: MessageFlags.Ephemeral })
    const song = queue.songs[0]

    const embed1 = new EmbedBuilder()
      .setColor(client.config.embedMusic)
      .setTitle(`> Music System | Now Playing ${client.config.arrowEmoji}`)
      .setDescription(`${client.config.musicEmojiSuccess} | Playing **\`${song.name}\`**, by ${song.user}`)
      .setTimestamp()
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

    message.channel.send({ embeds: [embed1] })
  }
}
