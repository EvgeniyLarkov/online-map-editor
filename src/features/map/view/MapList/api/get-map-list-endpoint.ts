import { EndpointObject } from 'shared/api/types';
import { EndpointParameters } from 'shared/types';

export const getMapsListEndpoint: EndpointObject = {
	url: ({ limit = 20, page = 1 }: EndpointParameters) =>
		`maps?limit=${limit}&page=${page}`,
	method: 'Get',
};
