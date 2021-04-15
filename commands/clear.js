exports.run = (client, message, args) => {
  message.channel.bulkDelete(100, true);
};
