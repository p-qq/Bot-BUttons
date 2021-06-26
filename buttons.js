const Discord = require("discord.js")
const { MessageEmbed, Client} = require("discord.js")
const client = new Client()
const { MessageButton } = require("discord-buttons")
require("discord-buttons")(client);

client.on("ready", () => {
  console.log(`Logged in: ${client.user.username} | ${client.user.id}`)
})


client.on("message", async (message) => {
  if(!message.guild || message.author.bot) return;

  if (message.content.startsWith('xtest')) {
    let test = new MessageButton().setStyle('blurple').setID(`verified`).setLabel("click to verify")
    let send = await message.channel.send("Click To Verify", { buttons: [test] })
    const logs = send.createButtonCollector(( button ) => button.clicker.user.id === message.author.id, {time : 60e3});
    const role = message.guild.roles.cache.find(role => role.name === "test role")
    logs.on("collect", (a) => {
      console.log(a.id)
      a.defer();
      if (a.id == "verified"){
        message.guild.members.cache.get(message.author.id).roles.add(role)
        let test2 = new MessageButton().setStyle('green').setID(`unverified`).setLabel(`verified ${message.author.username}`)
        send.edit(`${message.author.username} verified`, { buttons: [test2] })
      }
      else if (a.id == "unverified"){
        message.guild.members.cache.get(message.author.id).roles.remove(role)
        send.edit(`${message.author.username} unverified`, { buttons: [test] })
      }
    })
  }
})
client.login("cum")