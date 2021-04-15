const Discord = require("discord.js");

module.exports = (client, messageReaction, user) => {
  const message = messageReaction.message;

  if(!user.bot) {
    // For reacting to ammunition information messages, closes, goes to next page or previous page
    if(messageReaction.message.query_result_ammo !== undefined) {
      // Check to see if emoji exists (created by bot) and which emoji was selected
      if(messageReaction.message.reactions.cache.get('❌') !== undefined && messageReaction.emoji.name === '❌') {
        // If reaction created by user do nothing
        if(messageReaction.users.cache.get(client.config.bot_id) === undefined) {
          messageReaction.remove();
          return;
        }
        // Delete message
        messageReaction.message.delete();
        return;
      }
      if(messageReaction.message.reactions.cache.get('⬅️') !== undefined && messageReaction.emoji.name === '⬅️') {
        // If reaction created by user do nothing
        if(messageReaction.users.cache.get(client.config.bot_id) === undefined) {
          messageReaction.remove();
          return;
        }
        // Previous Page
        const embed = new Discord.MessageEmbed();
        embed.setTitle("This is the ammunition information for the given caliber: " + messageReaction.message.query_result_ammo[0].caliber);
        embed.setColor('#e6e6e6');
        embed.setDescription("__FD | PP | AD% | A% | R% | FC | 1 | 2 | 3 | 4 | 5 | 6__\nFD = Flesh Damage\nPP = Penetration Power\nAD% = Armor DMG %\nA% = Accuracy Percent\nR% = Recoil Percent\nFC = Fragmentation Chance\n1..6 = Armor Effectiveness Against Class");

        if((messageReaction.message.last_item_index + 1) % client.config.max_shown_in_message !== 0) {
          messageReaction.message.last_item_index = messageReaction.message.last_item_index - ((messageReaction.message.last_item_index + 1) % client.config.max_shown_in_message)
        } else {
          messageReaction.message.last_item_index = messageReaction.message.last_item_index - client.config.max_shown_in_message;
        }
        for(i = messageReaction.message.last_item_index + 1 - client.config.max_shown_in_message; i < messageReaction.message.last_item_index + 1; i++) {
          embed.addFields({name: messageReaction.message.query_result_ammo[i].name, value: messageReaction.message.query_result_ammo[i].flesh_damage + " | " + messageReaction.message.query_result_ammo[i].penetration_power + " | " + messageReaction.message.query_result_ammo[i].armor_damage_percent + " | " + messageReaction.message.query_result_ammo[i].accuracy_percent + " | " + messageReaction.message.query_result_ammo[i].recoil_percent + " | " + messageReaction.message.query_result_ammo[i].fragmentation_chance + " | " + messageReaction.message.query_result_ammo[i].armor_effect_1 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_2 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_3 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_4 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_5 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_6});
        }

        messageReaction.message.edit(embed).then(async (msg) => {
          await msg.reactions.removeAll();
          if(msg.last_item_index + 1 - client.config.max_shown_in_message === 0) {
            await msg.react("❌");
            await msg.react("➡️");
          } else {
            await msg.react("❌");
            await msg.react("⬅️");
            await msg.react("➡️");
          }
        });

        return;
      }
      if(messageReaction.message.reactions.cache.get('➡️') !== undefined && messageReaction.emoji.name === '➡️') {
        // If reaction created by user do nothing
        if(messageReaction.users.cache.get(client.config.bot_id) === undefined) {
          messageReaction.remove();
          return;
        }
        // Next page
        const embed = new Discord.MessageEmbed();
        embed.setTitle("This is the ammunition information for the given caliber: " + messageReaction.message.query_result_ammo[0].caliber);
        embed.setDescription("__FD | PP | AD% | A% | R% | FC | 1 | 2 | 3 | 4 | 5 | 6__\nFD = Flesh Damage\nPP = Penetration Power\nAD% = Armor DMG %\nA% = Accuracy Percent\nR% = Recoil Percent\nFC = Fragmentation Chance\n1..6 = Armor Effectiveness Against Class");

        if(messageReaction.message.last_item_index + 1 + client.config.max_shown_in_message >= messageReaction.message.query_result_ammo.length) {
          for(i = messageReaction.message.last_item_index + 1; i < messageReaction.message.query_result_ammo.length; i++) {
            embed.addFields({name: messageReaction.message.query_result_ammo[i].name, value: messageReaction.message.query_result_ammo[i].flesh_damage + " | " + messageReaction.message.query_result_ammo[i].penetration_power + " | " + messageReaction.message.query_result_ammo[i].armor_damage_percent + " | " + messageReaction.message.query_result_ammo[i].accuracy_percent + " | " + messageReaction.message.query_result_ammo[i].recoil_percent + " | " + messageReaction.message.query_result_ammo[i].fragmentation_chance + " | " + messageReaction.message.query_result_ammo[i].armor_effect_1 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_2 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_3 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_4 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_5 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_6});
          }
          messageReaction.message.last_item_index = messageReaction.message.query_result_ammo.length - 1;
          messageReaction.message.edit(embed).then(async (msg) => {
            await msg.reactions.removeAll();
            await msg.react("❌");
            await msg.react("⬅️");
          });
        } else {
          for(i = messageReaction.message.last_item_index + 1; i < messageReaction.message.last_item_index + 1 + client.config.max_shown_in_message; i++) {
            embed.addFields({name: messageReaction.message.query_result_ammo[i].name, value: messageReaction.message.query_result_ammo[i].flesh_damage + " | " + messageReaction.message.query_result_ammo[i].penetration_power + " | " + messageReaction.message.query_result_ammo[i].armor_damage_percent + " | " + messageReaction.message.query_result_ammo[i].accuracy_percent + " | " + messageReaction.message.query_result_ammo[i].recoil_percent + " | " + messageReaction.message.query_result_ammo[i].fragmentation_chance + " | " + messageReaction.message.query_result_ammo[i].armor_effect_1 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_2 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_3 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_4 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_5 + " | " + messageReaction.message.query_result_ammo[i].armor_effect_6});
          }

          messageReaction.message.last_item_index = messageReaction.message.last_item_index + client.config.max_shown_in_message;
          messageReaction.message.edit(embed).then(async (msg) => {
            await msg.reactions.removeAll();
            await msg.react("❌");
            await msg.react("⬅️");
            await msg.react("➡️");
          });
        }

        return;
      }

      messageReaction.remove();;
    }
  }

};
