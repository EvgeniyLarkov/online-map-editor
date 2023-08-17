import { create } from 'zustand';
import { MapStoreType } from './types';

export const MapStore = create<MapStoreType>((set) => ({
	id: null,
	hash: null,
	name: null,
	description: null,
	public: null,
	creator: null,
	createdAt: null,
	updatedAt: null,
	update: (data) => set({ ...data }),
}));
