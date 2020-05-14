const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Iniciado como ${client.user.tag}!`);
  client.user.setActivity('Assistindo para servir', {
    type: "PLAYING"
  });
});

client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.channel.id != config.salaRecebe) return;
  var a = msg.attachments.find(v => v.url);
  if(a == null || a == ''){
    var msgComprovante = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`**Comprovante do ${msg.author.username}**`)
        .setDescription(msg.content)
        .setTimestamp()
        .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);
  }else{
    var msgComprovante = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`**Comprovante do ${msg.author.username}**`)
        .setDescription(msg.content)
        .setImage(a.url)
        .setTimestamp()
        .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);
  }

  client.guilds.get(msg.guild.id).channels.get(config.salaEntrega).send(msgComprovante).then(() => {
      msg.delete(0);
      console.log(`Comprovante capturado e enviado!`);
  }).catch((err) => {
      msg.delete(0);
      msg.reply(`Não conseguir enviar para o sistema, Tente novamente mais tarde!`);
      console.log(`Comprovante não enviado, verifique este erro com o desenvolvedor!`);
      console.log(err);
  });
});

client.login(config.token);