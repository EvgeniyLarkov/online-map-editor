import { defaultErrorHandlingMiddleware, queryRaw } from 'shared/api';
import { queryWithMiddleware } from 'shared/common/queryWithMiddleware';
import { unauthorizedMiddleware } from 'entities/session';
import {
	getMapLoginedEndpoint,
	getMapUnloginedEndpoint,
} from './connectToMap.endpoint';
import { connectToMapDTO } from './types';

export const connectToMapLogined = (hash: string) => {
	const response = queryWithMiddleware<{ hash: string }, connectToMapDTO>(
		getMapLoginedEndpoint,
		{
			hash,
		},
		[defaultErrorHandlingMiddleware, unauthorizedMiddleware]
	);

	return response;
};

export const connectToMapUnlogined = (hash: string) => {
	const response = queryWithMiddleware<{ hash: string }, connectToMapDTO>(
		getMapUnloginedEndpoint,
		{
			hash,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};
