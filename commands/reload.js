exports.run = (client, message, args) => {
  const fs = require("fs");

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require("./" + file);
      let commandName = file.split(".")[0];
      console.log('Attempting to reload command ' + commandName);
      if (client.commands.has(commandName)) {
        delete require.cache[require.resolve('./' + commandName + ".js")];
        client.commands.delete(commandName);
      }
      client.commands.set(commandName, props);
    });
  });
};
