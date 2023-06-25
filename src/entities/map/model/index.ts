import { create } from 'zustand';
import { MapStore } from './types';

export const useMapStore = create<MapStore>((set) => ({
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
