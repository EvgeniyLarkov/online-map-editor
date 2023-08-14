import { queryRaw } from 'shared/api';
import {
	getMapLoginedEndpoint,
	getMapUnloginedEndpoint,
} from './connectToMap.endpoint';
import { connectToMapDTO } from './types';

export const connectToMapLogined = (hash: string) => {
	const response = queryRaw<{ hash: string }, connectToMapDTO>(
		getMapLoginedEndpoint,
		{
			hash,
		}
	);

	return response;
};

export const connectToMapUnlogined = (hash: string) => {
	const response = queryRaw<{ hash: string }, connectToMapDTO>(
		getMapUnloginedEndpoint,
		{
			hash,
		}
	);

	return response;
};
