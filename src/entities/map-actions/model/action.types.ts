import { LatLng } from 'leaflet';
import { MAP_ACTION_TYPES, MapAction } from './types';

export type OMEActionsData = PolylineData | MarkerData;

export type DefaultActionsData = {
	name?: string;
	description?: string;
};

export type PolylineData = DefaultActionsData & {
	coordinates: [LatLng, LatLng];
};

export type MarkerData = DefaultActionsData & Record<string, unknown>;

export const isActionPolyline = (
	action: MapAction
): action is MapAction<PolylineData> => {
	return action.type === MAP_ACTION_TYPES.polyline;
};

export const isActionMarker = (
	action: MapAction<MarkerData>
): action is MapAction<MarkerData> => {
	return action.type === MAP_ACTION_TYPES.marker;
};
