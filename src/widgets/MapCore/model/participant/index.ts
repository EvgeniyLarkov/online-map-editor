import { create } from 'zustand';
import { MapParticipantStoreType } from './types';

export const MapParticipantStore = create<MapParticipantStoreType>((set) => ({
	hash: null,
	mapHash: null,
	userHash: null,
	name: null,
	type: null,
	participantHash: null,
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
				participantHash: null,
				version: null,
				createdAt: null,
			};
		}),
	set: (participant) =>
		set(() => {
			return { ...participant };
		}),
}));
