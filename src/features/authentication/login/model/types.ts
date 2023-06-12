import { UserDto } from 'entities/user/model/types';

export type LoginRequestDto = {
	email: string;
	password: string;
};

export type UserLoginResponseDto = {
	token: string;
	user: UserDto;
};
