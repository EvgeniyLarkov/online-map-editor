import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserDto, UserStoreInterface } from './types';

const userStorageName = 'user-storage';

interface UserStore extends UserStoreInterface {
	update: (data: Partial<UserDto>) => void;
	clear: () => void;
}

export const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			id: null,
			firstName: null,
			lastName: null,
			email: null,
			photo: null,
			hash: null,
			isOnline: false,
			provider: null,
			socialId: null,
			role: null,
			status: null,
			createdAt: null,
			updatedAt: null,
			deletedAt: null,
			update: (data) =>
				set((state) => {
					return { state, ...data };
				}),
			clear: () =>
				set({
					id: null,
					firstName: null,
					lastName: null,
					email: null,
					hash: null,
					isOnline: false,
					provider: null,
					socialId: null,
					role: null,
					status: null,
					createdAt: null,
					updatedAt: null,
					deletedAt: null,
				}),
		}),
		{
			name: userStorageName,
		}
	)
);
