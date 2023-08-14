import { create } from 'zustand';
import { transformOMEError } from 'shared/common/transformOMEError';
import { ErrorsStore, OMEError } from './types';

export const errorsStore = create<ErrorsStore>((set) => ({
	errorsList: [],
	errorsById: {},
	add: (errorItems) =>
		set((state) => {
			const items = Array.isArray(errorItems) ? errorItems : [errorItems];
			const newState = {
				errorsList: [...state.errorsList],
				errorsById: { ...state.errorsById },
			};

			const itemsToAdd: OMEError[] = [];
			const itemsToReplace: OMEError[] = [];

			items.forEach((errorItem) => {
				const storeError = transformOMEError(errorItem);
				const exist = state.errorsById[storeError.id];

				if (exist) {
					itemsToReplace.push(storeError);
				} else {
					itemsToAdd.push(storeError);
				}
			});

			if (itemsToAdd.length > 0) {
				itemsToAdd.forEach((errorItem) => {
					newState.errorsById[errorItem.id] = errorItem;
					newState.errorsList.push(errorItem.id);
				});
			}

			if (itemsToReplace.length > 0) {
				itemsToReplace.forEach((errorItem) => {
					newState.errorsById[errorItem.id] = errorItem;
				});
			}

			return newState;
		}),
	drop: (hashes) =>
		set((state) => {
			const dropHashses = Array.isArray(hashes) ? hashes : [hashes];

			const newState = {
				errorsList: [...state.errorsList],
				errorsById: { ...state.errorsById },
			};

			if (dropHashses.length > 0) {
				newState.errorsList = newState.errorsList.filter((errorItemHash) => {
					return !dropHashses.includes(errorItemHash);
				});

				dropHashses.forEach((hash) => {
					delete newState.errorsById[hash];
				});
			}

			return newState;
		}),
	clear: () => set({ errorsById: {}, errorsList: [] }),
}));
