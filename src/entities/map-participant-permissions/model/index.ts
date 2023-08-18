import { create } from 'zustand';
import { MapParticipantPermissionsStoreType } from './types';

export const MapParticipantPermissionsStore =
	create<MapParticipantPermissionsStoreType>((set) => ({
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
