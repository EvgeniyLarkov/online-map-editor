import { makeQuery } from 'shared/api';
import { isSuccessRequest } from 'shared/common/isSuccessRequest';
import { OMEMap } from 'entities/map';
import { CreateMapDto } from './types';
import { createMapEndpoint } from '../api/create-map-endpoint';

export const createMap = async (data: CreateMapDto) => {
	const response = await makeQuery<CreateMapDto, OMEMap>(createMapEndpoint, {
		data,
	});

	if (isSuccessRequest(response)) {
		return response;
	}

	return response;
};
