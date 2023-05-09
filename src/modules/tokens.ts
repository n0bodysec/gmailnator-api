import { CustomError } from '@n0bodysec/ts-utils';
import { Gmailnator } from '..';

export class Tokens
{
	constructor(private base: Gmailnator) { }

	xsrf: string | undefined;
	session: string | undefined;

	get = async () =>
	{
		const res = await this.base.axios.get('/');
		const headers = res.headers['set-cookie'];
		if (!headers) throw new CustomError('The `Set-Cookie` header was not found');

		const xsrf = decodeURIComponent(headers?.find((x) => x.includes('XSRF-TOKEN'))?.split('; ')[0]?.split('=')[1] ?? '') || undefined;
		const session = decodeURIComponent(headers?.find((x) => x.includes('gmailnator_session'))?.split('; ')[0]?.split('=')[1] ?? '') || undefined;

		this.xsrf = xsrf;
		this.session = session;

		return { response: res, xsrf, session };
	};
}
