import { create } from 'zustand';
import { SessionState } from './types';

export const useSession = create<SessionState>((set) => {
	return {
		isAuthorized: false,
		accessToken: null,
		userHash: null,
		setSessionData: (data) => {
			set({ ...data });
		},
	};
});
