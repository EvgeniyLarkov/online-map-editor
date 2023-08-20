import { mapsEditPermissions } from 'entities/map-participant-permissions';
import { WithNull } from 'shared/types';

export class MapPermissionEntity {
	hash: string;

	map: string;

	mapHash: string;

	anonymous_view: boolean;

	edit_rules: mapsEditPermissions;

	createdAt: Date;

	updatedAt: Date;

	deletedAt: Date;
}

export type MapPermissions = WithNull<MapPermissionEntity>;

type MapPermissionsStoreActions = {
	set: (data: Partial<MapPermissionEntity>) => void;
	clear: () => void;
};

export type MapPermissionsStoreType = MapPermissionsStoreActions &
	MapPermissions;
