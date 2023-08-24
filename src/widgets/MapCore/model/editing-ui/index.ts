import { create } from 'zustand';
import { MapEditingUIActionsStore } from './types';

export const MapEditingUIStore = create<MapEditingUIActionsStore>((set) => ({
	action: null,
	setEditing: (action: string | null) =>
		set({
			action,
		}),
}));
