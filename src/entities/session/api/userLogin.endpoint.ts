import { EndpointObject } from 'shared/api/types';

export const userLoginEndpoint: EndpointObject = {
	url: () => 'auth/email/login',
	method: 'POST',
};
