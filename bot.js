var fila = []
const Discord = require('discord.js');
const bot = new Discord.Client();


bot.login(process.env.BOT_TOKEN);

bot.on('message', message => {
    
    var achar = fila.indexOf(message.author.id)
    if (achar >= 0 ) return
    else if (0 >= achar){
    fila.push(message.author.id)
    setTimeout(() =>{
    var achar2 = fila.indexOf(message.author.id)
    if (achar2 == null ) return
    fila.splice(achar2,1)
    },3000)
}
    
 

    if (message.content.toLocaleLowerCase().startsWith('!loja')){
        message.channel.send('Loja indisponivel nesse momento, se deseja uma conta chame o luii no pv '); 
    
    }
    
    if (message.content.toLocaleLowerCase().startsWith('!comandos')){
        message.reply('Lista de Comandos!\n• !loja '); 
    
    }


let role = message.guild.roles.find("name", "BotPerm");
if(message.member.roles.has(role.id) && message.content.startsWith("!limpar")){
  msgDel = 100;
  let numberMessages = parseInt(msgDel);
  message.channel.fetchMessages({limit: numberMessages}).then(messages => message.channel.bulkDelete(messages));
  message.channel.send('Chat limpo!');

}

let role2 = message.guild.roles.find("name", "BotPerm");
if(message.member.roles.has(role.id) && (message.content.toLocaleLowerCase().startsWith('!aviso'))){
    message.channel.send('Teste'); 
}
});

bot.on('guildMemberAdd', member => {
    bot.guilds.get(member.guild.id).members.get(member.id).sendMessage(`Bem-vindo ${member} ao ${member.guild.name}`);
})

bot.on('ready', () => {
    bot.user.setActivity('MINECRAFT ORIGINAL POR R$24,99 | DESEJA COMPRAR ? CHAME O GUSTAVOLUII NO PRIVADO!!!', {type: 'PLAYING'});
}); 
