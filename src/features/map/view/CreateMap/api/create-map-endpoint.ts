import { EndpointObject } from 'shared/api/types';

export const createMapEndpoint: EndpointObject = {
	url: () => `maps`,
	method: 'Post',
};
