# The easiest way to steal a friend using an LLM!

## Basic concept:
- Export the Discord messages of a channel where your target is particularly active, then feed it to this script.
- The script will then generate a `training.jsonl` file, which you can use to fine-tune an existing LLM.
- Once the LLM is fine-tuned, you can use it to generate messages that sound like your target.

## How to use:
- Download and run [Tyrrrz/DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter) to export the messages of a channel where your target is particularly active in JSON.
- The bigger a yapper your target is, the better the results will be.
- Rename the file (that will probably contain special symbols) to `chat.json` to make this easier.
- Place the `chat.json` file in the same directory (folder) as this script.
- Specify the username of your target as a command-line argument: `node index.js "JohnDoe#1234"`.
- After a little while you'll have a `training.jsonl` file in the same directory (folder) as this script.
- Congratulations! The hard part is done. Now just read either [OpenAI's](https://platform.openai.com/docs/guides/fine-tuning) or [MistralAI's](https://docs.mistral.ai/guides/finetuning/) to fine-tune an existing LLM.