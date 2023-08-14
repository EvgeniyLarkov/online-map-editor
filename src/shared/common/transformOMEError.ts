import axios, { AxiosError } from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';
import { OMEError, WsError } from 'shared/stores/errors';
import { isWsError } from './isWsError';

export function transformOMEError(
	error: AxiosError | Error | WsError | unknown
): OMEError {
	if (axios.isAxiosError(error)) {
		const OMEerror: OMEError = {
			type: 'custom',
			id: nanoid(5), // Pohui,
			msg: [error.message],
			name: error.message.toString(),
			message: error.message.toString(),
			rawError: error,
		};

		if (error.code) {
			const code = parseInt(error.code, 10);

			if (code > 0) {
				OMEerror.statusCode = parseInt(error.code, 10);
			}
		}
	} else if (isWsError(error)) {
		return {
			type: 'custom',
			id: nanoid(5), // Pohui,
			msg: error.data.message,
			statusCode: error.data.statusCode,
			name: error.event.toString(),
			message: error.data.message.toString(),
			rawError: error,
		};
	}

	return {
		type: 'default',
		name: 'Internal error',
		message: 'default',
		id: nanoid(5), // Pohui,
		rawError: error,
	};
}
