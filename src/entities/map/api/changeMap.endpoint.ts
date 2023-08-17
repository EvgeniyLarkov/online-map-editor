import { EndpointObject } from 'shared/api/types';
import { EndpointParameters } from 'shared/types';

export const changeMapLoginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) => `maps/${hash}/logined`,
	method: 'Patch',
};

export const changeMapUnloginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) => `maps/${hash}`,
	method: 'Patch',
};
