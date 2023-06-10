import { UnsuccssesRequest } from 'shared/api/types';

export function isSuccessRequest<T extends Record<string, any>>(
	req: T | UnsuccssesRequest
): req is T {
	return typeof req?.error === 'undefined';
}
