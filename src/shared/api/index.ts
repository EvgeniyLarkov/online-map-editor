import axios, { type AxiosError, AxiosResponse } from 'axios';
import { getUrl } from 'shared/common/getUrl';
import { transformError } from 'shared/common/transformError';
import { EndpointObject, RequestOptions, UnsuccssesRequest } from './types';

export const makeQuery = async function makeQuery<T, Res>(
	endpoint: EndpointObject,
	options: RequestOptions<T>
): Promise<Res | UnsuccssesRequest> {
	const data = options.data ? options.data : null;

	const routeText = endpoint.url(options);

	const token = localStorage.getItem('access-token');

	try {
		const request: AxiosResponse<Res> = await axios({
			method: endpoint.method,
			url: getUrl(routeText),
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return request.data;
	} catch (err: AxiosError | Error | unknown) {
		return transformError(err);
	}
};
