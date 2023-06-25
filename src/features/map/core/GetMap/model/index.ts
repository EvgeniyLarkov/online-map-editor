import { OMEMap } from 'entities/map';
import { makeQuery } from 'shared/api';
import { getMapEndpoint } from '../api/get-map-endpoint';

export const getMapByHash = async (hash: string) => {
	const response = await makeQuery<{ hash: string }, OMEMap>(getMapEndpoint, {
		hash,
	});

	return response;
};
