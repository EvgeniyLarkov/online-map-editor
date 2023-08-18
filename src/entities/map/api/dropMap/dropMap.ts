import { defaultErrorHandlingMiddleware } from 'shared/api';
import { queryWithMiddleware } from 'shared/common/queryWithMiddleware';
import {
	dropMapLoginedEndpoint,
	dropMapUnloginedEndpoint,
} from './dropMap.endpoint';

export const dropMapLogined = (hash: string) => {
	const response = queryWithMiddleware<string, boolean>(
		dropMapLoginedEndpoint,
		{
			hash,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};

export const dropMapUnlogined = (hash: string) => {
	const response = queryWithMiddleware<string, boolean>(
		dropMapUnloginedEndpoint,
		{
			hash,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};
