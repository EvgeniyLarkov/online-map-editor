import { EndpointObject } from 'shared/api/types';
import { EndpointParameters } from 'shared/types';

export const getMapEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) => `maps/${hash}`,
	method: 'Get',
};
