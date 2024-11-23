const fs = require("fs");

console.time("load messages");
let messages = JSON.parse(fs.readFileSync("chat.json").toString()).messages;
console.timeEnd("load messages");

console.time("parse messages")
messages = messages.map((msg) => { return { "author": msg.author.name, "content": msg.content }});

let jsonl = "";

const VICTIM = process.argv[2];

if (!VICTIM) {
	throw new Error("No victim specified.");
}

let context = [];

while (messages.length > 1) {
	let msg = messages.shift();

	if (msg.author === VICTIM) {
		context.push({ "role": "assistant", "content": msg.content || "[NO CONTENT]" });
		jsonl += `${JSON.stringify(context)}\n`;
	} else {
		context.push({ "role": "user", "content": msg.author + ": " + msg.content || "[NO CONTENT]" });
	}

	if (context.length > 100) {
		context.shift();
		while (context[0].role == "assistant") {
			context.shift();
		}
	}
}

// only leave the first 1000 lines of the JSONL
// jsonl = jsonl.split("\n").slice(0, 500).join("\n");

// remove the first 99 results as those are always garbage
jsonl = jsonl.split("\n").slice(99).join("\n");
console.timeEnd("parse messages");

console.time("write file");
fs.writeFileSync("training.jsonl", jsonl);
console.timeEnd("write file");