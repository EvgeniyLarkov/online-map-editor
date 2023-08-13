import axios, {
	type AxiosError,
	AxiosResponse,
	AxiosRequestConfig,
} from 'axios';
import { getUrl } from 'shared/common/getUrl';
import { transformError } from 'shared/common/transformError';
import {
	EndpointObject,
	RequestAdditionalOptions,
	RequestOptions,
	UnsuccssesRequest,
} from './types';

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
