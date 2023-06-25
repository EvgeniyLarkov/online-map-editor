type UserEmail = string;
export type UserHash = string;

export const UserRoles = {
	User: 'User',
	Admin: 'Admin',
};

export const UserStatus = {
	Inactive: 'Inactive',
	Active: 'Active',
};

export type UserDto = {
	id: number;
	email: UserEmail;
	provider: string;
	socialId: undefined | number;
	firstName: string;
	lastName: string;
	hash: UserHash;
	createdAt: string;
	updatedAt: string;
	deletedAt: undefined | string;
	// photo: undefined | FileDto;
	isOnline?: boolean;
	role: {
		id: number;
		name: keyof typeof UserRoles;
	};
	status: {
		id: number;
		name: keyof typeof UserStatus;
	};
};
