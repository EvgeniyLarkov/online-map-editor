import axios, { AxiosError } from 'axios';
import { IErrorTypes, UnsuccssesRequest } from 'shared/api/types';

export function transformError(error: AxiosError | Error | unknown) {
	let transformedError: UnsuccssesRequest = {
		error: IErrorTypes.internal,
		message: 'something go wrong',
	};

	if (axios.isAxiosError(error)) {
		if (error.response) {
			transformedError = {
				error: IErrorTypes.response,
				message: error.response.statusText,
				// data: error.response.data,
			};
		} else {
			transformedError = {
				error: IErrorTypes.request,
				message: error.message,
			};
		}
	}

	return transformedError;
}
