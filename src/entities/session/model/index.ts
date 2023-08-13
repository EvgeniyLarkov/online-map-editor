import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SessionState } from './types';

const sessionStoreName = 'session-store';

export const useSession = create<SessionState>()(
	persist(
		(set) => ({
			isAuthorized: false,
			accessToken: null,
			anonId: null,
			userHash: null,
			setSessionData: (data) => {
				set({ ...data });
			},
			clear: () => {
				set({
					isAuthorized: false,
					accessToken: null,
					userHash: null,
					anonId: null,
				});
			},
		}),
		{
			name: sessionStoreName,
		}
	)
);
