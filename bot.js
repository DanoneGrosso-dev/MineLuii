var fila = []
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!";

var name;
var usrAuth = 0;

bot.login(process.env.BOT_TOKEN);



bot.on("ready", function() {

    console.log("ready");
});

bot.on('message', function (message) {
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

    console.log(message.content);

    if ( message.author.equals(bot.user))
    return;


if( !message.content.startsWith(PREFIX))
    return;


var argv = message.content.substr(PREFIX.length).split(" ");
console.log("argv: "+argv+", argv[1]: "+argv[1]+"");


switch(argv[0].toLowerCase()) {
    case "loja":
        var embedd = new Discord.RichEmbed()
        .setAuthor("MineLuii - Loja", "https://i.imgur.com/tU1Rk6C.png")
        .setTitle(`Clique aqui para acessar a loja! :dollar:`)
        .setURL("https://mineluii.com/")
        .setColor("14DDDA")
        message.channel.sendEmbed(embedd);
          break;

    case "membersinfo":
        var embedd = new Discord.RichEmbed()
        .setAuthor("Quantidade de Membros:", "https://i.imgur.com/tU1Rk6C.png")
        .setColor("0080FF")
        .addField("Quantidade de membros:", message.guild.memberCount)
        message.channel.sendEmbed(embedd);
          break;

}});


bot.on('ready', () => {
      bot.user.setGame(`wwww.mineluii.com | !Loja`, `https://www.twitch.tv/gustavoluii`);
});


bot.on('guildMemberAdd', member => {
    bot.guilds.get(member.guild.id).members.get(member.id).sendMessage("Bem-Vindo " + member + " à :trophy: MineLuii\n\n`Conheça nossos produtos abaixo:`\n\n• Minecraft Unmigrated FULL ACESSO - :moneybag: R$19,90\n• Minecraft Original Alternativo 3 Contas - :moneybag: R$1,99\n• Capa da Optifine - :moneybag: R$29,99\n• Regedit OP + DNS - :moneybag: R$29,99\n\nhttps://discord.gg/BcnX29f");

});

bot.on('guildMemberAdd', member => {
    member.guild.channels.get('444673090409070592').send("Bem-Vindo " + member.user + " à :trophy: MineLuii\n\n`Chats Importantes em nosso Discord` :wink:\n\n<#432893877456732172> - Chat de Produtos.\n<#432318076734930944> - Chat de Dúvidas.\n<#409490794551181314> - Chat de Avisos.\n<#422075213677723661> - Opinião de Clientes.");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
    
        if(cmd === "!skin"){
        let reason = args.slice(0).join(' ');
        if (reason.length < 1) return message.reply('Cite um nick de minecraft.');
        
        let embed = new Discord.RichEmbed()
      
        .setTitle(`<a:cubo:487622863583576075> ${args[0]}`)
        .setImage(`https://mc-heads.net/body/${args[0]}`)
        .setFooter(message.author.tag,message.author.avatarURL )
        .setTimestamp(new Date())
        .setColor("14DDDA")
        message.channel.send(embed)
      };
    
    if(cmd === `!mute`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("❌ | Você não tem permissão!")
    
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("Você não especificou o membro.");

    let role = message.guild.roles.find(r => r.name === "🔇 Mutado");
    if(!role) {
      try{
        role = await message.guild.createRole({
          name: "🔇 Mutado",
          color: "#030303",
          permissions: []
        });

        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
           });
        });
      } catch(e) {
          console.log(e.stack);
      }
    }
  if(toMute.roles.has(role.id)) return message.channel.sendMessage("Membro mutado com sucesso.");
  
  await toMute.addRole(role);
  message.channel.sendMessage("🔇 | Membro Mutado!");
  
    return;
}

  if(cmd === `!ban`){

   let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!bUser) return message.channel.send("Membro não encontrado.");
   let bReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ | Você não tem permissão!");
   if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ | Essa pessoa não pode ser banida.");

   let banEmbed = new Discord.RichEmbed()
   .setDescription("Banimento:")
   .setColor("#bc0000")
   .setImage("https://i.imgur.com/VNY0oqd.gif")
   .addField("Membro Banido", `${bUser} ID ${bUser.id}`)
   .addField("Banido por", `<@${message.author.id}> ID ${message.author.id}`)
   .addField("Banido no chat", message.channel)
   //.addField("Data e Hora", message.createdAt)
   .addField("Motivo", bReason);

   let incidentchannel = message.guild.channels.find(`name`, "punições");
   if(!incidentchannel) return message.channel.send("Não foi possível encontrar o canal de punições.");

   message.guild.member(bUser).ban(bReason);
   incidentchannel.send(banEmbed);
   message.channel.send("⚠ | Membro Banido!");


   return;
 }

 if(cmd === `!kick`){


  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Membro não encontrado.");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ | Você não tem permissão!");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ | Essa pessoa não pode ser expulsa.");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Expulso:")
  .setColor("#e56b00")
  .addField("Membro Expulso", `${kUser} ID ${kUser.id}`)
  .addField("Expulso por", `<@${message.author.id}> ID ${message.author.id}`)
  .addField("Expulso no Chat", message.channel)
  .addField("Data e Hora", message.createdAt)
  .addField("Motivo", kReason);

  let kickChannel = message.guild.channels.find(`name`, "punições");
  if(!kickChannel) return message.channel.send("Não foi possível encontrar o canal de punições.");

  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);
  message.channel.send("⚠ | Membro Expulso!");

  return;
}

if(cmd === `!setarcargo`){

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Você não possui permissão para fazer isso.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Não foi possível encontrar esse usuário.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Especifique um cargo!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Cargo não encontrado.");

  if(rMember.roles.has(gRole.id)) return message.reply("Esse membro já possui esse cargo.");
  await(rMember.addRole(gRole.id));
  message.channel.send(":white_check_mark:  | Cargo setado!");

  try{
    await rMember.send("Parabéns, agora você possui o cargo `" + gRole.name +"` em nosso Discord.\n\nAgora você pode deixar sua opinião de compra no canal #referências")
  }catch(e){
    message.channel.send(`Parabéns <@${rMember.id}>, agora você possui o cargo ${gRole.name}. em nosso Discord.`)
  }

  return;
}

if(cmd === `!removercargo`){

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Você não possui permissão para fazer isso.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Não foi possível encontrar esse usuário.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Especifique um cargo!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Cargo não encontrado.");
  message.channel.send(":white_check_mark:  | Cargo removido!");

  if(!rMember.roles.has(gRole.id)) return message.reply("Esse membro não possui nenhum cargo.");
  await(rMember.removeRole(gRole.id));

  return;
}

if(cmd === `!limpar`){

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
if(!args[0]) return message.channel.send("Especifique quantas linhas.").then(msg => msg.delete(5000));
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Limpei ${args[0]} mensagens.`).then(msg => msg.delete(5000));
});
}


});

bot.on('message', message => {
    
  let command = message.content.split(" ")[0];
  command = command.slice(PREFIX.length);
  let args = message.content.split(" ").slice(1);
  if (command === 'ping') {
      message.channel.send(`:exclamation:| Meu ping está ${Date.now() - message.createdTimestamp} ms.`)
  }
  if (command === 'say') {
  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  const sayMessage = args.join(" ");
  message.delete().catch();
  message.channel.send(sayMessage);

  }})
