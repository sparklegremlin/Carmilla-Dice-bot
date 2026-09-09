require('dotenv').config();
const { REST, Routes } = require('discord.js');
const diceCommand = require('./commands/dice');

const commands = [diceCommand.data.toJSON()];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    // Guild-scoped registration shows up instantly (good for one server).
    // Swap to Routes.applicationCommands(CLIENT_ID) for global commands,
    // which can take up to an hour to propagate.
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('Slash commands registered successfully.');
  } catch (error) {
    console.error(error);
  }
})();
