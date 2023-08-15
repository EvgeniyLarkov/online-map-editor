import { MAP_ACTION_TYPES, MapAction } from 'entities/map-actions';
import { LocationMarker } from './Marker/Marker';

export function GetMapActionByType(action: MapAction) {
	const { type } = action;

	const actionsByType = {
		[MAP_ACTION_TYPES.marker]: LocationMarker,
		[MAP_ACTION_TYPES.initial_position]: LocationMarker,
	};

	return actionsByType[type] ? actionsByType[type] : null;
}
