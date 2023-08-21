import {
	MAP_ACTION_TYPES,
	MapAction,
	isActionMarker,
	isActionPolyline,
} from 'entities/map-actions';
import { OMEMarker } from './Marker/Marker';
import { OMEPolyline } from './Polyline/Polyline';

export function GetMapActionByType(action: MapAction) {
	const { type } = action;

	if (MAP_ACTION_TYPES.initial_position === type) {
		return OMEMarker;
	}

	if (isActionMarker(action)) {
		return OMEMarker;
	}

	if (isActionPolyline(action)) {
		return OMEPolyline;
	}

	return null;
}
