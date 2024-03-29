import _axios from 'axios';
import EventEmitter from 'events';
import { Email } from './modules/email';
import { Messages } from './modules/messages';
import { Tokens } from './modules/tokens';
import { Utils } from './modules/utils';
import { IGmailnatorOptions } from './utils/types';

export class Gmailnator
{
	tokens: Tokens = new Tokens(this);
	email: Email = new Email(this);
	messages: Messages = new Messages(this);
	utils: Utils = new Utils(this);
	events: EventEmitter = new EventEmitter();

	axios = _axios.create({
		baseURL: 'https://www.emailnator.com',
		headers: {
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
		},
	});

	shutdown = () =>
	{
		this.messages.checker.updateInterval(0);
		this.events.removeAllListeners();
	};

	constructor(options?: IGmailnatorOptions)
	{
		this.messages.checker.delayMs = options?.delays?.checkEmailsDelay || 0;
		this.messages.checker.updateInterval(this.messages.checker.delayMs);
	}
}
