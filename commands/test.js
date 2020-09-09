exports.run = (client, message, args) => {
  message.channel.send("a");
  console.log(message.member.permissions.has(message.member.permissions.KICK_MEMBERS));
  console.log((message.member.permissions & 0x2) == 0x2);
};
