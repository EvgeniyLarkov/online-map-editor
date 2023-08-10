import { create } from 'zustand';
import { MAP_UI_MODE, MapUIActionsStore } from './types';

export const useMapUIStore = create<MapUIActionsStore>((set, get) => ({
	mode: MAP_UI_MODE.intial,
	selectedAction: null,
	changeMode: (mode) =>
		set((state) => {
			if (state.mode === mode) {
				return state;
			}

			if (mode === MAP_UI_MODE.action_select) {
				return {
					mode,
					selectedAction: null,
				};
			}

			if (mode === MAP_UI_MODE.intial) {
				return {
					mode,
					selectedAction: null,
				};
			}

			return state;
		}),
	selectAction: (action) =>
		set((state) => {
			if (get().mode === MAP_UI_MODE.action_select) {
				return {
					selectedAction: action,
				};
			}

			return state;
		}),
}));
