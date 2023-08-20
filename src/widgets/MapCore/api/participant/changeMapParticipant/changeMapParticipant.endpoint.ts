import { EndpointObject } from 'shared/api/types';
import { EndpointParameters } from 'shared/types';

export const changeMapParticipantLoginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) =>
		`maps/participant/${hash}/logined`,
	method: 'Patch',
};

export const changeMapParticipantUnloginedEndpoint: EndpointObject = {
	url: ({ hash = 'default' }: EndpointParameters) => `maps/participant/${hash}`,
	method: 'Patch',
};
