import { Gmailnator } from '..';
import { CustomError } from '../utils/CustomError';

export class Utils
{
	constructor(private base: Gmailnator) { }

	genHeaders = () =>
	{
		if (!this.base.tokens.session) throw new CustomError('Session token was not found');
		if (!this.base.tokens.xsrf) throw new CustomError('XSRF token was not found');

		return {
			Cookie: 'gmailnator_session=' + encodeURIComponent(this.base.tokens.session),
			'X-Xsrf-Token': this.base.tokens.xsrf,
			'Content-Type': 'application/json',
		};
	};
}
