import { MapAction, mapActionTypes } from 'entities/map-actions/model/types';
import { LatLng } from 'leaflet';
import {
	MapParticipant,
	ParticipantMapPermissions,
} from 'widgets/MapCore/model';

export const MAP_EVENTS = {
	new_action: 'new_action',
	join_map: 'join_map',
	leave_map: 'leave_map',
	get_actions: 'get_map_actions',
	drop_action: 'drop_action',
	change_action: 'change_action',
} as const;

type MAP_EVENTS_KEYS = keyof typeof MAP_EVENTS;
export type mapsActionNames = typeof MAP_EVENTS[MAP_EVENTS_KEYS];

export interface MapActionDto {
	hash?: string;
	mapHash: string;
	type: mapActionTypes;
	coordinates?: LatLng;
	data?: Record<string, unknown>;
}

export interface ChangeMapActionDto {
	hash: string;
	mapHash: string;
	type?: mapActionTypes;
	coordinates?: LatLng;
	data?: Record<string, unknown>;
}

export type MapEventGetActionsDTO = {
	participant: MapParticipant;
	permissions: ParticipantMapPermissions;
	actions: MapAction[];
};
