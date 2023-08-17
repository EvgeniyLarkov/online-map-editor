import { mapsEditPermissions } from 'widgets/MapCore/model';

export class ChangeMapPermissionsDto {
	anonymous_view?: boolean;

	edit_rules?: mapsEditPermissions;
}
