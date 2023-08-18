import { EndpointObject } from 'shared/api/types';
import { EndpointParameters } from 'shared/types';

export const dropMapLoginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) => `maps/${hash}/logined`,
	method: 'Delete',
};

export const dropMapUnloginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) => `maps/${hash}`,
	method: 'Delete',
};
