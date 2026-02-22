import "dotenv/config";
import { Client, GatewayIntentBits, Collection } from "discord.js";

import ping from "./commands/ping";
import say from "./commands/say";
import userinfo from "./commands/userinfo";

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

const commands = new Collection<string, any>();
commands.set(ping.data.name, ping);
commands.set(say.data.name, say);
commands.set(userinfo.data.name, userinfo);

client.once("ready", () => {
	console.log(`Bot ready as ${client.user?.tag}`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "Terjadi error saat menjalankan command.",
			ephemeral: true,
		});
	}
});

client.login(process.env.BOT_TOKEN);
