const { EmbedBuilder, MessageFlags } = require("discord.js");

module.exports = {
  name: 'playtop',
  aliases: ['pt'],
  description: 'Play a song at the top of the queue',
  usage: 'playtop <song_name>',
  category: 'Music',
  inVoiceChannel: true,
  usableInDms: false,
  async execute(message, client, args) {
    const string = args.join(' ')

    const embed = new EmbedBuilder()
      .setColor(client.config.embedMusic)
      .setDescription(`${client.config.musicEmojiError} | There is **nothing** in the queue right now!`)

    if (!string) return message.channel.send({ embeds: [embed], flags: MessageFlags.Ephemeral })
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      position: 1
    })
  }
}
