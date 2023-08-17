import { UserDto } from 'shared/types/user';

export type LoginRequestDto = {
	email: string;
	password: string;
};

export type UserLoginResponseDto = {
	token: string;
	user: UserDto;
};
