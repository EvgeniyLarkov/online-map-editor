import { EndpointObject } from 'shared/api/types';
import { EndpointParameters } from 'shared/types';

export const changeMapPermissionsLoginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) =>
		`maps/permissions/${hash}/logined`,
	method: 'Patch',
};

export const changeMapPermissionsUnloginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) => `maps/permissions/${hash}`,
	method: 'Patch',
};
