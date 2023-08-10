import { mapActionTypes } from 'entities/map-actions/model/types';
import { LatLng } from 'leaflet';

export const MAP_EVENTS = {
	new_action: 'new_action',
	join_map: 'join-map',
	leave_map: 'leave-map',
	get_actions: 'get-map-actions',
	drop_action: 'drop_action',
} as const;

type MAP_EVENTS_KEYS = keyof typeof MAP_EVENTS;
export type mapsActionNames = typeof MAP_EVENTS[MAP_EVENTS_KEYS];

export interface MapEventDto {
	hash?: string;
	mapHash: string;
	type: mapActionTypes;
	coordinates?: LatLng;
	data?: Record<string, unknown>;
}

export interface ChangeMapEventDto {
	hash: string;
	mapHash: string;
	type?: mapActionTypes;
	coordinates?: LatLng;
	data?: Record<string, unknown>;
}
