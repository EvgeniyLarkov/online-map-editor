import { UserDto } from 'entities/user/model/types';

export type LoginRequestDto = {
	login: string;
	password: string;
};

export type UserLoginResponseDto = {
	token: string;
	user: UserDto;
};
