import { WsError } from 'shared/stores/errors/model/types';

export function isWsError(error: WsError | unknown): error is WsError {
	if (typeof error === 'object' && error !== null) {
		const probablyWsError = error as Record<string, unknown>;

		return typeof probablyWsError.event === 'string' && !!probablyWsError.data;
	}
	return false;
}
