import { create } from 'zustand';
import { MapPermissionsStoreType } from './types';

export const MapPermissionsStore = create<MapPermissionsStoreType>((set) => ({
	hash: null,
	map: null,
	mapHash: null,
	anonymous_view: null,
	edit_rules: null,
	createdAt: null,
	updatedAt: null,
	deletedAt: null,
	set: (permissions) =>
		set(() => {
			return {
				...permissions,
			};
		}),
	clear: () =>
		set(() => {
			return {
				hash: null,
				map: null,
				mapHash: null,
				anonymous_view: null,
				edit_rules: null,
				createdAt: null,
				updatedAt: null,
				deletedAt: null,
			};
		}),
}));
