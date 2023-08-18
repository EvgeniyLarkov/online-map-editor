import { defaultErrorHandlingMiddleware } from 'shared/api';
import { queryWithMiddleware } from 'shared/common/queryWithMiddleware';
import { MapParticipant } from 'entities/map-participant';
import { ChangeMapParticipantDto } from './types';
import {
	changeMapParticipantLoginedEndpoint,
	changeMapParticipantUnloginedEndpoint,
} from './changeMapParticipant.endpoint';

export const changeMapParticipantLogined = (
	participantHash: string,
	data: ChangeMapParticipantDto
) => {
	const response = queryWithMiddleware<ChangeMapParticipantDto, MapParticipant>(
		changeMapParticipantLoginedEndpoint,
		{
			hash: participantHash,
			data,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};

export const changeMapParticipantUnlogined = (
	participantHash: string,
	data: ChangeMapParticipantDto
) => {
	const response = queryWithMiddleware<ChangeMapParticipantDto, MapParticipant>(
		changeMapParticipantUnloginedEndpoint,
		{
			hash: participantHash,
			data,
		},
		[defaultErrorHandlingMiddleware]
	);

	return response;
};
