import { makeQuery } from 'shared/api';
import { isSuccessRequest } from 'shared/common/isSuccessRequest';
import { IPaginationOptions } from 'shared/types';
import { OMEMap } from 'entities/map';
import { RequestAdditionalOptions } from 'shared/api/types';
import { getMapsListEndpoint } from '../api/get-map-list-endpoint';

export const getMapsList = async (
	data: IPaginationOptions,
	additionalOptions?: RequestAdditionalOptions
) => {
	const response = await makeQuery<IPaginationOptions, Array<OMEMap>>(
		getMapsListEndpoint,
		data,
		additionalOptions
	);

	if (isSuccessRequest(response)) {
		return response;
	}

	return [];
};
