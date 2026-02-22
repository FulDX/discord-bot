import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	EmbedBuilder,
} from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("userinfo")
		.setDescription("Show User Information")
		.addUserOption((option) =>
			option.setName("user").setDescription("User").setRequired(false),
		),

	async execute(interaction: ChatInputCommandInteraction) {
		const target = interaction.options.getUser("user") || interaction.user;

		const fullUser = await interaction.client.users.fetch(target.id, {
			force: true,
		});

		const member = await interaction.guild?.members.fetch(target.id);

		const roles =
			member?.roles.cache
				.filter((role) => role.name !== "@everyone")
				.map((role) => role.toString())
				.join(", ") || "No Role";
		const highestRole = member?.roles.highest.name || "Nothing";
		const badges = fullUser.flags?.toArray().join(", ") || "No Badges";

		const accent = fullUser.accentColor;
		const accentHex = accent
			? `#${accent.toString(16).padStart(6, "0")}`
			: "Tidak ada accent color";

		const embed = new EmbedBuilder()
			.setTitle("User Info")
			.setThumbnail(fullUser.displayAvatarURL({ size: 512 }))
			.setImage(fullUser.bannerURL({ size: 1024 }) || null)
			.addFields(
				{ name: "Username", value: target.tag, inline: true },
				{ name: "User Id", value: target.id, inline: true },
				{
					name: "Account Created",
					value: `<t:${Math.floor(target.createdTimestamp / 1000)}:F>`,
					inline: false,
				},
				{
					name: "Joined Server",
					value: member?.joinedAt
						? `<t:${Math.floor(member.joinedTimestamp! / 1000)}:F>`
						: "Tidak diketahui",
					inline: false,
				},
				{ name: "Highest Role", value: highestRole },
				{ name: "Roles", value: roles },
				{ name: "Badges", value: badges },
			)
			.setColor(accent ?? "Blue");

		await interaction.reply({ embeds: [embed] });
	},
};
