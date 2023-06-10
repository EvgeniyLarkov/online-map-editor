export type SessionState = {
	isAuthorized: boolean;
	accessToken: null | string;
	userHash: null | string;
	setSessionData: (data: Omit<SessionState, 'setSessionData'>) => void;
	// login: (data: LoginRequestDto) => Promise<UserDto | null>;
};
