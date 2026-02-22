import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Bot repeats your message")
        .addStringOption(option =>
            option
                .setName("text")
                .setDescription("Message you wanna sent")
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const text = interaction.options.getString("text", true);
        await interaction.reply(text);
    }
}