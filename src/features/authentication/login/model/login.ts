import { makeQuery } from 'shared/api';
import { userLoginEndpoint } from 'entities/session/api/userLogin.endpoint';
import { isSuccessRequest } from 'shared/common/isSuccessRequest';
import { LoginRequestDto, UserLoginResponseDto } from './types';

export const makeLogin = async (data: LoginRequestDto) => {
	const response = await makeQuery<LoginRequestDto, UserLoginResponseDto>(
		userLoginEndpoint,
		{ data }
	);

	if (isSuccessRequest(response)) {
		return {
			user: response.user,
			session: {
				isAuthorized: true,
				accessToken: response.token,
				userHash: response.user.hash,
			},
		};
	}

	return {
		user: null,
		session: {
			isAuthorized: false,
			accessToken: null,
			userHash: null,
		},
		...response,
	};
};
