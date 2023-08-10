import { mapActionTypes } from 'entities/map-actions/model/types';

export const MAP_UI_MODE = {
	intial: 'intial',
	action_select: 'action_select',
} as const;

type MAP_UI_MODE_KEYS = keyof typeof MAP_UI_MODE;
export type mapUIMode = typeof MAP_UI_MODE[MAP_UI_MODE_KEYS];

type MapUIStoreActions = {
	changeMode: (mode: mapUIMode) => void;
	selectAction: (actionType: mapActionTypes | null) => void;
};

type MapUIStoreVariables = {
	mode: mapUIMode;
	selectedAction: null | mapActionTypes;
};

export type MapUIActionsStore = MapUIStoreVariables & MapUIStoreActions;
