import { OMEActionsData } from './action.types';

export const MAP_ACTION_TYPES = {
	initial_position: 0,
	marker: 1,
	polyline: 2,
} as const;

type MAP_ACTION_TYPES_KEYS = keyof typeof MAP_ACTION_TYPES;
export type mapActionTypes = typeof MAP_ACTION_TYPES[MAP_ACTION_TYPES_KEYS];

export type MapAction<T = OMEActionsData> = {
	hash: string;

	type: mapActionTypes;

	status: number;

	lat: number | null;

	lng: number | null;

	data?: T;

	creatorHash: string;

	mapHash: string;

	version?: number;

	createdAt: Date;
};

type MapActionsStoreActions = {
	add: (data: MapAction | MapAction[]) => void;
	drop: (data: MapAction | MapAction[]) => void;
	clear: () => void;
};

type MapActionsStoreVariables = {
	actionsList: string[] | [];
	actionsByHash: Record<string, MapAction>;
};

export type MapActionsStoreType = MapActionsStoreVariables &
	MapActionsStoreActions;

export const MAP_ACTION_DRAGGABLES = {
	[MAP_ACTION_TYPES.marker]: true,
} as const;
