import { defaultErrorHandlingMiddleware } from 'shared/api';
import { queryWithMiddleware } from 'shared/common/queryWithMiddleware';
import {
	getMapPermissionsLoginedEndpoint,
	getMapPermissionsUnloginedEndpoint,
} from './getMapPermissions.endpoint';
import { MapPermissionEntity } from '../model/types';

export const getMapPermissionsLogined = (hash: string) => {
	const response = queryWithMiddleware<{ hash: string }, MapPermissionEntity>(
		getMapPermissionsLoginedEndpoint,
		{
			hash,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};

export const getMapPermissionsUnlogined = (hash: string) => {
	const response = queryWithMiddleware<{ hash: string }, MapPermissionEntity>(
		getMapPermissionsUnloginedEndpoint,
		{
			hash,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};
