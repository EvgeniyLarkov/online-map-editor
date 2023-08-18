import { defaultErrorHandlingMiddleware } from 'shared/api';
import { queryWithMiddleware } from 'shared/common/queryWithMiddleware';
import {
	changeMapLoginedEndpoint,
	changeMapUnloginedEndpoint,
} from './changeMap.endpoint';
import { ChangeMapDto } from './types';
import { OMEMap } from '../model/types';

export const changeMapLogined = (hash: string, data: ChangeMapDto) => {
	const response = queryWithMiddleware<ChangeMapDto, OMEMap>(
		changeMapLoginedEndpoint,
		{
			hash,
			data,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};

export const changeMapUnlogined = (hash: string, data: ChangeMapDto) => {
	const response = queryWithMiddleware<ChangeMapDto, OMEMap>(
		changeMapUnloginedEndpoint,
		{
			hash,
			data,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};
