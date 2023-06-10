type UserEmail = string;
export type UserHash = string;

export enum UserRoles {
	'User' = 'User',
	'Admin' = 'Admin',
}

export enum UserStatus {
	'Inactive' = 'Inactive',
	'Active' = 'Active',
}

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
		name: UserRoles;
	};
	status: {
		id: number;
		name: UserStatus;
	};
};
