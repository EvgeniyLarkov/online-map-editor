import { makeQuery } from 'shared/api';
import {
	getMapLoginedEndpoint,
	getMapUnloginedEndpoint,
} from './connectToMap.endpoint';
import { connectToMapDTO } from './types';

export const connectToMapLogined = async (hash: string) => {
	const response = await makeQuery<{ hash: string }, connectToMapDTO>(
		getMapLoginedEndpoint,
		{
			hash,
		}
	);

	return response;
};

export const connectToMapUnlogined = async (hash: string) => {
	const response = await makeQuery<{ hash: string }, connectToMapDTO>(
		getMapUnloginedEndpoint,
		{
			hash,
		}
	);

	return response;
};
