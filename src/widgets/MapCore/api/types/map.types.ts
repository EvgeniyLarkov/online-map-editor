import { LatLng } from 'leaflet';

export const MAP_ACTION_TYPES = {
	initial_position: 0,
	marker: 1,
} as const;

type MAP_ACTION_TYPES_KEYS = keyof typeof MAP_ACTION_TYPES;
export type mapActionTypes = typeof MAP_ACTION_TYPES[MAP_ACTION_TYPES_KEYS];

export const MAP_EVENTS = {
	new_event: 'new-event',
	join_map: 'join-map',
	leave_map: 'leave-map',
} as const;

type MAP_EVENTS_KEYS = keyof typeof MAP_EVENTS;
export type mapsEventNames = typeof MAP_EVENTS[MAP_EVENTS_KEYS];

export interface MapEventDto {
	mapHash: string;
	type: mapActionTypes;
	coordinates?: LatLng;
	data?: Record<string, unknown>;
}
