import { create } from 'zustand';
import {
	MAP_SETTINGS_MENU_CATEGORIES,
	MapSettingsMenuCategoriesStore,
} from '../types';

export const MapSettingsUIStore = create<MapSettingsMenuCategoriesStore>(
	(set) => ({
		category: MAP_SETTINGS_MENU_CATEGORIES.default,
		opened: false,
		close: () =>
			set(() => {
				return {
					opened: false,
				};
			}),
		open: (category) =>
			set(() => {
				return {
					category: category || MAP_SETTINGS_MENU_CATEGORIES.default,
					opened: true,
				};
			}),
	})
);
