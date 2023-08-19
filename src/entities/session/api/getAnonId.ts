import { queryWithMiddleware } from 'shared/common/queryWithMiddleware';
import { defaultErrorHandlingMiddleware } from 'shared/api';
import { getAnonIdEndpoint } from './getAnonId.endpoint';

export const getAnonId = () => {
	const response = queryWithMiddleware<void, string>(getAnonIdEndpoint, {}, [
		defaultErrorHandlingMiddleware,
	]);

	return response;
};
