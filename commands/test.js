const Discord = require("discord.js");

exports.run = (client, message, args) => {
  // client.con.query("insert into eft.ammunition_information (caliber, name, flesh_damage, penetration_power, armor_damage_percent, accuracy_percent, recoil_percent, fragmentation_chance, armor_effect_1, armor_effect_2, armor_effect_3, armor_effect_4, armor_effect_5, armor_effect_6) values ('test', 'allen', 'sucks', 2, 0, 1, 2, 3, 1, 2, 3, 4, 5, 6)", (err, result) => {
  //   if(err) throw err;
  // });
  client.con.query("select * from eft.ammunition_information where caliber = ?", [args[0]], (err, result) => {
    if(err) throw err;

    if(args.length === 0) {
      message.reply("Missing ammo name!");
      return;
    }

    if(args.length > 1) {
      message.reply("Please type in only one caliber type or too many extra strings");
      return;
    }

    if (result.length === 0) {
      message.reply("I couldn't find anything!");
      return;
    }

    message.reply("Fetching Information...").then(async msg => {
      if (err) throw err;
      msg.query_result_ammo = result;
      const embed = new Discord.MessageEmbed();
      embed.setTitle("This is the ammunition information for the given caliber: " + result[0].caliber);
      embed.setColor('#e6e6e6');
      embed.setDescription("__FD | PP | AD% | A% | R% | FC | 1 | 2 | 3 | 4 | 5 | 6__\nFD = Flesh Damage\nPP = Penetration Power\nAD% = Armor DMG %\nA% = Accuracy Percent\nR% = Recoil Percent\nFC = Fragmentation Chance\n1..6 = Armor Effectiveness Against Class");

      if(result.length > client.config.max_shown_in_message) {
          msg.last_item_index = client.config.max_shown_in_message - 1;
          for(i = 0; i < client.config.max_shown_in_message; i++) {
            embed.addFields({name: result[i].name, value: result[i].flesh_damage + " | " + result[i].penetration_power + " | " + result[i].armor_damage_percent + " | " + result[i].accuracy_percent + " | " + result[i].recoil_percent + " | " + result[i].fragmentation_chance + " | " + result[i].armor_effect_1 + " | " + result[i].armor_effect_2 + " | " + result[i].armor_effect_3 + " | " + result[i].armor_effect_4 + " | " + result[i].armor_effect_5 + " | " + result[i].armor_effect_6});
          }
          msg.edit(embed);
          await msg.react("❌");
          await msg.react("➡️");
      } else {
          for(i = 0; i < result.length; i++) {
            embed.addFields({name: result[i].name, value: result[i].flesh_damage + " | " + result[i].penetration_power + " | " + result[i].armor_damage_percent + " | " + result[i].accuracy_percent + " | " + result[i].recoil_percent + " | " + result[i].fragmentation_chance + " | " + result[i].armor_effect_1 + " | " + result[i].armor_effect_2 + " | " + result[i].armor_effect_3 + " | " + result[i].armor_effect_4 + " | " + result[i].armor_effect_5 + " | " + result[i].armor_effect_6});
          }
          msg.edit(embed);
          msg.last_item_index = result.length;
          msg.react("❌");
      }
    });
  });

  //message.reply("Added new row to table!");
};
