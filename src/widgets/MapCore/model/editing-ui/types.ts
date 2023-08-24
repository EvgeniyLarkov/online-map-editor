type MapEditingUIActionsActions = {
	setEditing: (actionHash: string | null) => void;
};

type MapEditingUIActionsVariables = {
	action: string | null;
};

export type MapEditingUIActionsStore = MapEditingUIActionsVariables &
	MapEditingUIActionsActions;
