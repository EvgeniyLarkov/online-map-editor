import { defaultErrorHandlingMiddleware } from 'shared/api';
import { queryWithMiddleware } from 'shared/common/queryWithMiddleware';
import { MapPermissionEntity } from '../model/types';
import { ChangeMapPermissionsDto } from './types';
import {
	changeMapPermissionsLoginedEndpoint,
	changeMapPermissionsUnloginedEndpoint,
} from './changeMapPermissions.endpoint';

export const changeMapPermissionsLogined = (
	hash: string,
	data: ChangeMapPermissionsDto
) => {
	const response = queryWithMiddleware<
		ChangeMapPermissionsDto,
		MapPermissionEntity
	>(
		changeMapPermissionsLoginedEndpoint,
		{
			hash,
			data,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};

export const changeMapPermissionsUnlogined = (
	hash: string,
	data: ChangeMapPermissionsDto
) => {
	const response = queryWithMiddleware<
		ChangeMapPermissionsDto,
		MapPermissionEntity
	>(
		changeMapPermissionsUnloginedEndpoint,
		{
			hash,
			data,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};
