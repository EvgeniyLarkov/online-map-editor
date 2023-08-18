import {
	mapParticipantStatuses,
	mapParticipantTypes,
} from 'entities/map-participant';

export class ChangeMapParticipantDto {
	mapHash: string;

	name?: string;

	type?: mapParticipantTypes;

	status?: mapParticipantStatuses;

	special_permissions?: Record<string, unknown> | null;
}
