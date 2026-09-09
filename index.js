require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const diceCommand = require('./commands/dice');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  try {
    if (interaction.isChatInputCommand() && interaction.commandName === 'dice') {
      await diceCommand.execute(interaction);
      return;
    }

    if (interaction.isButton()) {
      await diceCommand.handleDiceButton(interaction);
      return;
    }
  } catch (err) {
    console.error(err);
    if (interaction.isRepliable()) {
      await interaction.reply({
        content: 'Something went wrong with that roll.',
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
