export type TEmailOptions = ('domain' | 'plusGmail' | 'dotGmail' | 'googleMail')[];

export interface IMessageContent
{
	messageID: string;
	from: string;
	subject: string;
	time: string;
}

export interface INewMessagesData
{
	newMessages: IMessageContent[];
	allMessages: IMessageContent[];
}

export interface IMessageListOptions
{
	email?: string;
	filterAds?: boolean;
}

export interface IMessageReadOptions
{
	email?: string;
	messageId: string;
}

export interface ITemporalEmailOptions
{
	localPart?: string;
	genSize?: number;
}

export interface IWaitMessagesOptions
{
	delayMs?: number;
	maxAttempts?: number;
	runImmediately?: boolean;
}

export interface IGmailnatorOptions
{
	delays?: {
		checkEmailsDelay?: number;
	};
}
