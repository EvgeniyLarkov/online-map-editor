import { EndpointObject } from 'shared/api/types';

export const getAnonIdEndpoint: EndpointObject = {
	url: () => 'auth/anonymous',
	method: 'GET',
};
