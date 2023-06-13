import { Gmailnator } from '..';
import { INewMessagesData } from '../utils/types';

(async () =>
{
	const api = new Gmailnator({
		delays: {
			checkEmailsDelay: 10000,
		},
	});

	await api.tokens.get();
	const { email } = await api.email.generate(['dotGmail', 'plusGmail', 'googleMail']);

	console.log('Generated email:', email);

	if (api.messages.checker.delayMs > 0)
	{
		console.log(`Checking for new emails every ${api.messages.checker.delayMs}ms...`);
		api.events.on('newMessages', async (data: INewMessagesData) =>
		{
			console.log(`Received new message(s): ${data.newMessages.map((message) => message.messageID).join(', ')}`);
		});
	}
})();
