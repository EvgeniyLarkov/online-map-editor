import {
	MAP_ACTION_TYPES,
	MapAction,
	isActionMarker,
	isActionPolygone,
	isActionPolyline,
} from 'entities/map-actions';
import { OMEMarker } from './Marker/Marker';
import { OMEPolyline } from './Polyline/Polyline';
import { OMEPolygone } from './Editables';

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

	if (isActionPolygone(action)) {
		return OMEPolygone;
	}

	return null;
}
