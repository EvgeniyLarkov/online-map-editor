import axios, {
	type AxiosError,
	AxiosResponse,
	AxiosRequestConfig,
	AxiosPromise,
} from 'axios';
import { getUrl } from 'shared/common/getUrl';
import { transformError } from 'shared/common/transformError';
import { transformOMEError } from 'shared/common/transformOMEError';
import { OMEError, errorsStore } from 'shared/stores/errors';
import {
	EndpointObject,
	RequestAdditionalOptions,
	RequestOptions,
	UnsuccssesRequest,
} from './types';

/**
 * OME: Legacy method to make queries
 */
export const makeQuery = async function makeQuery<T, Res>(
	endpoint: EndpointObject,
	options: RequestOptions<T>,
	additionalOptions?: RequestAdditionalOptions
): Promise<Res | UnsuccssesRequest> {
	const data = options.data ? options.data : null;

	const routeText = endpoint.url(options);

	const token = JSON.parse(localStorage.getItem('session-store') || '').state
		?.accessToken;

	const axiosOptions: AxiosRequestConfig<any> = {
		method: endpoint.method,
		url: getUrl(routeText),
		data,
		headers: {},
	};

	if (!axiosOptions.headers) {
		axiosOptions.headers = {};
	}

	if (typeof token !== 'undefined' && token !== null) {
		axiosOptions.headers.Authorization = `Bearer ${token}`;
	} else {
		const anonymousId = JSON.parse(localStorage.getItem('session-store') || '')
			.state?.anonymousId;

		axiosOptions.headers['anonymous-id'] = anonymousId;
	}

	if (additionalOptions) {
		if (additionalOptions.abortController) {
			axiosOptions.signal = additionalOptions.abortController.signal;
		}
	}

	try {
		const request: AxiosResponse<Res> = await axios(axiosOptions);

		return request.data;
	} catch (err: AxiosError | Error | unknown) {
		return transformError(err);
	}
};

export type queryReturnType<Res> = AxiosPromise<Res> & { abort: () => void };

/**
 * OME: Main method to make raw queries
 */
export const queryRaw = function queryRaw<T, Res>(
	endpoint: EndpointObject,
	options: RequestOptions<T>
): queryReturnType<Res> {
	const { data } = options;

	const routeText = endpoint.url(options);

	const token = JSON.parse(localStorage.getItem('session-store') || '').state
		?.accessToken;

	const axiosOptions: AxiosRequestConfig<T> = {
		method: endpoint.method,
		url: getUrl(routeText),
		data,
		headers: {},
	};

	if (!axiosOptions.headers) {
		axiosOptions.headers = {};
	}

	if (typeof token !== 'undefined' && token !== null) {
		axiosOptions.headers.Authorization = `Bearer ${token}`;
	} else {
		const anonymousId = JSON.parse(localStorage.getItem('session-store') || '')
			.state?.anonymousId;

		axiosOptions.headers['anonymous-id'] = anonymousId;
	}

	const controller = new AbortController();
	axiosOptions.signal = controller.signal;

	const request: AxiosPromise<Res> = axios(axiosOptions);

	const enhancedRequest = request as typeof request & { abort: () => void }; // Хитрость
	enhancedRequest.abort = () => controller.abort();

	return enhancedRequest;
};

/**
 * OME: Method to make queries with default errors handling
 * If query results in error it will be handled with default error handler
 * See NotificationsModule
 */
export const querySimple = async function querySimple<T, Res>(
	endpoint: EndpointObject,
	options: RequestOptions<T>
): Promise<queryReturnType<Res>> {
	try {
		const query = queryRaw<T, Res>(endpoint, options);
		const result = await query;

		return result;
	} catch (err: AxiosError | Error | unknown) {
		const error = transformOMEError(err);
		errorsStore.getState().add(error);

		throw new OMEError(error);
	}
};

/**
 * OME: Middleware for queryWithMiddleware method. Adds new error to notifications store
 */
export const defaultErrorHandlingMiddleware =
	function defaultErrorHandlingMiddleware<Res>(
		query: Promise<AxiosResponse<Res, any>>
	) {
		return query.catch((err: OMEError) => {
			errorsStore.getState().add(err);
			return Promise.reject(err);
		});
	};
