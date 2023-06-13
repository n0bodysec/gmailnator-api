import { randomBytes } from 'crypto';
import { Gmailnator } from '..';
import { ITemporalEmailOptions, TEmailOptions } from '../utils/types';

export class Email
{
	constructor(private base: Gmailnator) { }

	lastUsed: string | undefined;

	set = (email: string) => { this.lastUsed = email; };

	generate = async (options: TEmailOptions = ['domain', 'plusGmail', 'dotGmail', 'googleMail']) =>
	{
		const res = await this.base.axios.post('/generate-email', { email: options }, {
			headers: this.base.utils.genHeaders(),
		});

		const genEmail = res.data.email[0];
		this.lastUsed = genEmail;

		return {
			response: res,
			email: genEmail,
		};
	};

	generate10m = (options?: ITemporalEmailOptions) =>
	{
		const genEmail = `${options?.localPart ?? randomBytes(options?.genSize ?? 8).toString('hex')}@tmpnator.live`;
		this.lastUsed = genEmail;

		return genEmail;
	};
}
