import "dotenv/config";
import { REST, Routes } from "discord.js";
import ping from "./commands/ping";
import say from "./commands/say";
import userinfo from "./commands/userinfo";

const commands = [ping.data, say.data, userinfo.data].map((cmd) => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN!);

async function deploy() {
	await rest.put(
		Routes.applicationGuildCommands(
			process.env.CLIENT_ID!,
			process.env.GUILD_ID!,
		),
		{ body: commands },
	);

	console.log("Slash Commands Deployed");
}

deploy();
