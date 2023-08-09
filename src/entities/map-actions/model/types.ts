export const MAP_ACTION_TYPES = {
	initial_position: 0,
	marker: 1,
} as const;

type MAP_ACTION_TYPES_KEYS = keyof typeof MAP_ACTION_TYPES;
export type mapActionTypes = typeof MAP_ACTION_TYPES[MAP_ACTION_TYPES_KEYS];

export type MapAction = {
	hash: string;

	type: mapActionTypes;

	status: number;

	lat: number | null;

	lng: number | null;

	data?: Record<string, unknown>;

	creatorHash: string;

	mapHash: string;

	version?: number;

	createdAt: Date;
};

type MapActionsStoreActions = {
	add: (data: MapAction | MapAction[]) => void;
};

type MapActionsStoreVariables = {
	actionsList: string[] | [];
	actionsByHash: Record<string, MapAction>;
};

export type MapActionsStore = MapActionsStoreVariables & MapActionsStoreActions;
