import express from 'express';

type ReqBody = { message: { text: string; chat: { id: string } } };

export const server = (tgApiToken: string, port: string): void => {
	const app = express();
	const TELEGRAM_URI = `https://api.telegram.org/bot${tgApiToken}/sendMessage`;

	app.use(express.json());
	app.use(
		express.urlencoded({
			extended: true
		})
	);

	app.post('/new-message', (req, res): void => {
		void (async (): Promise<void> => {
			const { message } = req.body as ReqBody;
			const messageText = message?.text?.toLowerCase()?.trim();
			const chatId = message?.chat?.id;

			if (!messageText || !chatId) {
				return void res.sendStatus(400);
			}

			const responseText = `${messageText} echo`;

			try {
				await fetch(TELEGRAM_URI, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						chat_id: chatId,
						text: responseText
					})
				});
				res.send('Done');
			} catch (e) {
				console.log(e);
				res.send(e);
			}
		})();
	});

	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
};
