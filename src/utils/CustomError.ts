export class CustomError extends Error
{
	date = new Date();
	extra: Record<string, unknown> | undefined;
	code: number;

	constructor(message: string, extra?: Record<string, unknown>, code?: number, ...params: any)
	{
		super(...params);

		if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);

		this.name = 'CustomError';
		this.message = message;
		this.extra = extra;
		this.code = code ?? 1;
	}
}
