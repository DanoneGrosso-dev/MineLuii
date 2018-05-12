const Discord = require('discord.js');
const bot = new Discord.Client();


bot.login(process.env.BOT_TOKEN);

bot.on('message', message => {
    

bot.on('guildMemberAdd', member => {
    bot.guilds.get(member.guild.id).members.get(member.id).sendMessage(`Bem-vindo ${member} ao ${member.guild.name}`);
})

bot.on('ready', () => {
    bot.user.setActivity('MINECRAFT ORIGINAL POR R$29,99 | DESEJA COMPRAR ? CHAME O GUSTAVOLUII NO PRIVADO!!!', {type: 'PLAYING'});
}); 
