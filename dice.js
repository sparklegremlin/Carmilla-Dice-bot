const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder,
  EmbedBuilder,
} = require('discord.js');
const path = require('path');

const data = new SlashCommandBuilder()
  .setName('dice')
  .setDescription("Roll for The Village at Carmilla's Gate");

async function execute(interaction) {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('carmilla_roll_d6')
      .setLabel('1d6')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId('carmilla_roll_d20')
      .setLabel('1d20')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('carmilla_roll_lifedeath')
      .setLabel('Life / Death')
      .setStyle(ButtonStyle.Primary)
  );

  await interaction.reply({
    content: '🩸 **The Dice** — choose your roll:',
    components: [row],
  });
}

async function handleDiceButton(interaction) {
  if (!interaction.isButton()) return;
  if (!interaction.customId.startsWith('carmilla_roll_')) return;

  const type = interaction.customId.replace('carmilla_roll_', '');

  if (type === 'd6') {
    const result = Math.floor(Math.random() * 6) + 1;
    await interaction.reply({ content: `🎲 **1d6** → **${result}**` });
    return;
  }

  if (type === 'd20') {
    const result = Math.floor(Math.random() * 20) + 1;
    await interaction.reply({ content: `🎲 **1d20** → **${result}**` });
    return;
  }

  if (type === 'lifedeath') {
    const isLife = Math.random() < 0.5;
    const fileName = isLife ? 'wings.png' : 'skull.png';
    const filePath = path.join(__dirname, '..', 'assets', fileName);

    const attachment = new AttachmentBuilder(filePath, { name: fileName });
    const embed = new EmbedBuilder()
      .setTitle(isLife ? '🕊️ Life' : '☠️ Death')
      .setColor(isLife ? 0xe8c877 : 0xa8232e)
      .setImage(`attachment://${fileName}`);

    await interaction.reply({ embeds: [embed], files: [attachment] });
    return;
  }
}

module.exports = { data, execute, handleDiceButton };
