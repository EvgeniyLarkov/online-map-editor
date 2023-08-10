import { create } from 'zustand';
import { MapAction, MapActionsStore } from './types';

export const useMapActionsStore = create<MapActionsStore>((set) => ({
	actionsList: [],
	actionsByHash: {},
	add: (actions) =>
		set((state) => {
			const items = Array.isArray(actions) ? actions : [actions];
			const newState = {
				actionsList: [...state.actionsList],
				actionsByHash: { ...state.actionsByHash },
			};

			const itemsToAdd: MapAction[] = [];
			const itemsToReplace: MapAction[] = [];

			items.forEach((action) => {
				const exist = state.actionsByHash[action.hash];

				if (exist) {
					itemsToReplace.push(action);
				} else {
					itemsToAdd.push(action);
				}
			});

			if (itemsToAdd.length > 0) {
				itemsToAdd.forEach((action) => {
					newState.actionsByHash[action.hash] = action;
					newState.actionsList.push(action.hash);
				});
			}

			if (itemsToReplace.length > 0) {
				itemsToReplace.forEach((action) => {
					newState.actionsByHash[action.hash] = action;
				});
			}

			return newState;
		}),
	drop: (actions) =>
		set((state) => {
			const items = Array.isArray(actions) ? actions : [actions];
			const newState = {
				actionsList: [...state.actionsList],
				actionsByHash: { ...state.actionsByHash },
			};

			const itemsToDrop: MapAction[] = [];

			items.forEach((action) => {
				const exist = state.actionsByHash[action.hash];

				if (exist) {
					itemsToDrop.push(action);
				}
			});

			if (itemsToDrop.length > 0) {
				const dropHashses = itemsToDrop.map((item) => item.hash);

				newState.actionsList = newState.actionsList.filter((actionHash) => {
					return !dropHashses.includes(actionHash);
				});

				dropHashses.forEach((hash) => {
					delete newState.actionsByHash[hash];
				});
			}

			return newState;
		}),
	empty: () => set({ actionsByHash: {}, actionsList: [] }),
}));
