import { create } from 'zustand';
import { MapParticipantStore } from './types';

export const useMapPermissionsStore = create<MapParticipantStore>((set) => ({
	view: null,
	edit_actions: null,
	drop_actions: null,
	add_actions: null,
	ban_participants: null,
	invite_participants: null,
	modify_participants: null,
	set_permissions: null,
	change_map_description: null,
	change_map_properties: null,
	clear: () =>
		set(() => {
			return {
				view: null,
				edit_actions: null,
				drop_actions: null,
				add_actions: null,
				ban_participants: null,
				invite_participants: null,
				modify_participants: null,
				set_permissions: null,
				change_map_description: null,
				change_map_properties: null,
			};
		}),
	set: (permissions) =>
		set(() => {
			return { ...permissions };
		}),
}));
