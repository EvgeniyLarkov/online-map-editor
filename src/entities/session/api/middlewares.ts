import { AxiosResponse } from 'axios';
import { OMEError } from 'shared/stores/errors';
import { SessionStore } from '../model';

export const unauthorizedMiddleware = function unauthorizedMiddleware<Res>(
	query: Promise<AxiosResponse<Res, any>>
) {
	return query.catch((err: OMEError) => {
		if (err.statusCode && err.statusCode === 401) {
			SessionStore.getState().clear();
		}

		console.log('unauthorizedMiddleware fired');

		return Promise.reject(err);
	});
};
