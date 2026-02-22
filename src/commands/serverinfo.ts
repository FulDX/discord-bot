import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	EmbedBuilder,
} from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("serverinfo")
		.setDescription("Show Server Information"),

	async execute(interaction: ChatInputCommandInteraction) {
		if (!interaction.guild) {
			await interaction.reply({
				content: "Can Only be Used in Server",
				ephemeral: true,
			});

			return;
		}

		const guild = interaction.guild;
		const owner = await guild.fetchOwner();
		const members = guild.memberCount;

		const embed = new EmbedBuilder()
			.setTitle("Server Info")
			.setThumbnail(guild.iconURL({ size: 512 }) || null)
			.addFields(
				{ name: "Server Id", value: guild.id, inline: true },
				{ name: "Owner", value: owner.user.tag, inline: true },
				{ name: "Total Member", value: `${members}`, inline: true },
				{
					name: "Create at",
					value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
					inline: true,
				},
			)
			.setColor("Blue")
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
