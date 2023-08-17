import { EndpointObject } from 'shared/api/types';
import { EndpointParameters } from 'shared/types';

export const getMapPermissionsLoginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) =>
		`maps/permissions/${hash}/logined`,
	method: 'Get',
};

export const getMapPermissionsUnloginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) => `maps/permissions/${hash}`,
	method: 'Get',
};
