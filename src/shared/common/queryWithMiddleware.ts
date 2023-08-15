import { queryRaw } from 'shared/api';
import { EndpointObject, RequestOptions } from 'shared/api/types';
import { UnifiedError } from 'shared/stores/errors';
import { AxiosResponse } from 'axios';
import { transformOMEError } from './transformOMEError';

export function queryWithMiddleware<T, Res>(
	endpoint: EndpointObject,
	options: RequestOptions<T>,
	middlewares: Array<
		(
			query: Promise<AxiosResponse<Res, any>>
		) => Promise<AxiosResponse<Res, any>>
	>
) {
	const query = queryRaw<T, Res>(endpoint, options);
	const enhancedQuery = query.catch((err: UnifiedError) => {
		const OMEErrorObj = transformOMEError(err);

		return Promise.reject(OMEErrorObj);
	});

	let lastChainedQuery = enhancedQuery;

	if (middlewares.length > 0) {
		middlewares.forEach((middleware) => {
			lastChainedQuery = middleware(lastChainedQuery);
		});
	}

	const enhancedRequest = lastChainedQuery as typeof enhancedQuery & {
		abort: () => void;
	}; // Хитрость
	enhancedRequest.abort = () => query.abort();

	return enhancedRequest;
}
