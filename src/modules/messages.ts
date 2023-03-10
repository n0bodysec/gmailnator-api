/* eslint-disable max-classes-per-file */
import { JSDOM } from 'jsdom';
import { Gmailnator } from '..';
import { IMessageContent, IMessageListOptions, IMessageReadOptions } from '../utils/types';

const isBase64 = (input: string) => /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(input);

class Checker
{
	constructor(private base: Gmailnator) { }

	delayMs = 0;
	interval: NodeJS.Timer | undefined;

	updateInterval = (delayMs: number) =>
	{
		clearInterval(this.interval);
		if (delayMs > 0) this.interval = setInterval(this.run, delayMs);
	};

	run = async () =>
	{
		if (this.delayMs <= 0)
		{
			clearInterval(this.interval);
			return;
		}

		if (!this.base.tokens.session || !this.base.tokens.xsrf) return;

		const newMessages = await this.base.messages.getNewerMessages();

		if (newMessages.length > 0)
		{
			this.base.events.emit('newMessages', {
				newMessages,
				allMessages: this.base.messages.cachedMessages,
			});
		}
	};
}

export class Messages
{
	constructor(private base: Gmailnator)
	{
		this.checker = new Checker(base);
	}

	cachedMessages: IMessageContent[] = [];
	checker: Checker;

	list = async (options?: IMessageListOptions) =>
	{
		this.base.email.lastUsed = options?.email || this.base.email.lastUsed;

		const res = await this.base.axios.post('/message-list', { email: this.base.email.lastUsed }, {
			headers: this.base.utils.genHeaders(),
		});

		this.cachedMessages = res.data.messageData as IMessageContent[];

		return {
			response: res,
			messageData: !options?.filterAds ? res.data.messageData : (res.data.messageData as IMessageContent[]).filter((x) => isBase64(x.messageID as string)),
		};
	};

	read = async (options: IMessageReadOptions) =>
	{
		this.base.email.lastUsed = options?.email || this.base.email.lastUsed;

		const res = await this.base.axios.post('/message-list', {
			email: this.base.email.lastUsed,
			messageID: options.messageId,
		}, {
			headers: this.base.utils.genHeaders(),
		});

		const dom = new JSDOM(res.data);
		dom.window.document.getElementById('subject-header')?.remove();
		return dom.window.document.body.innerHTML;
	};

	getNewerMessages = async (): Promise<IMessageContent[]> =>
	{
		const oldMessages = this.cachedMessages;
		await this.list();

		const lookupTable: { [key in IMessageContent['messageID']]: boolean } = {};
		oldMessages.forEach((message) => { lookupTable[message.messageID] = true; });

		const result: IMessageContent[] = [];

		this.cachedMessages.forEach((message) =>
		{
			if (!lookupTable[message.messageID]) result.push(message);
		});

		return result;
	};
}
