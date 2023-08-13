export type SessionType = {
	isAuthorized: boolean;
	accessToken: null | string;
	userHash: null | string;
	anonId: null | string;
};

export type SessionState = SessionType & {
	setSessionData: (data: Partial<SessionType>) => void;
	clear: () => void;
	// login: (data: LoginRequestDto) => Promise<UserDto | null>;
};
