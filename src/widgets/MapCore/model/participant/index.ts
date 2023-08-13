import { create } from 'zustand';
import { MapParticipantStore } from './types';

export const useMapParticipantStore = create<MapParticipantStore>((set) => ({
	hash: null,
	mapHash: null,
	userHash: null,
	name: null,
	type: null,
	status: null,
	special_permissions: null,
	version: null,
	createdAt: null,
	deletedAt: null,
	clear: () =>
		set(() => {
			return {
				hash: null,
				mapHash: null,
				userHash: null,
				name: null,
				type: null,
				status: null,
				special_permissions: null,
				version: null,
				createdAt: null,
			};
		}),
	set: (participant) =>
		set(() => {
			return { ...participant };
		}),
}));
