import { create } from 'zustand';
import { MapParticipant } from 'entities/map-participant/';
import { MapParticipantsStoreType } from './types';

export const MapParticipantsStore = create<MapParticipantsStoreType>((set) => ({
	paricipantsList: [],
	paricipantsByHash: {},
	add: (actions) =>
		set((state) => {
			const items = Array.isArray(actions) ? actions : [actions];
			const newState = {
				paricipantsList: [...state.paricipantsList],
				paricipantsByHash: { ...state.paricipantsByHash },
			};

			const itemsToAdd: MapParticipant[] = [];
			const itemsToReplace: MapParticipant[] = [];

			items.forEach((action) => {
				const exist = state.paricipantsByHash[action.participantHash];

				if (exist) {
					itemsToReplace.push(action);
				} else {
					itemsToAdd.push(action);
				}
			});

			if (itemsToAdd.length > 0) {
				itemsToAdd.forEach((action) => {
					newState.paricipantsByHash[action.participantHash] = action;
					newState.paricipantsList.push(action.participantHash);
				});
			}

			if (itemsToReplace.length > 0) {
				itemsToReplace.forEach((action) => {
					newState.paricipantsByHash[action.participantHash] = action;
				});
			}

			return newState;
		}),
	drop: (actions) =>
		set((state) => {
			const items = Array.isArray(actions) ? actions : [actions];
			const newState = {
				paricipantsList: [...state.paricipantsList],
				paricipantsByHash: { ...state.paricipantsByHash },
			};

			const itemsToDrop: string[] = [];

			items.forEach((action) => {
				const pHash =
					typeof action === 'string' ? action : action.participantHash;

				const exist = state.paricipantsByHash[pHash];

				if (exist) {
					itemsToDrop.push(pHash);
				}
			});

			if (itemsToDrop.length > 0) {
				const dropHashses = itemsToDrop;

				newState.paricipantsList = newState.paricipantsList.filter(
					(actionHash) => {
						return !dropHashses.includes(actionHash);
					}
				);

				dropHashses.forEach((hash) => {
					delete newState.paricipantsByHash[hash];
				});
			}

			return newState;
		}),
	clear: () => set({ paricipantsByHash: {}, paricipantsList: [] }),
}));
