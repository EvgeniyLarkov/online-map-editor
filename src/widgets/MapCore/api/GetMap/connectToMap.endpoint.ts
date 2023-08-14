import { EndpointObject } from 'shared/api/types';
import { EndpointParameters } from 'shared/types';

export const getMapLoginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) =>
		`maps/connect/logined/:hash/${hash}`,
	method: 'Post',
};

export const getMapUnloginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) =>
		`maps/connect/logined/:hash/${hash}`,
	method: 'Post',
};
