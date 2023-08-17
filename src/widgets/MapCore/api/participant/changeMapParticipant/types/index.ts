import {
	mapParticipantStatuses,
	mapParticipantTypes,
} from 'widgets/MapCore/model';

export class ChangeMapParticipantDto {
	mapHash: string;

	name?: string;

	type?: mapParticipantTypes;

	status?: mapParticipantStatuses;

	special_permissions?: Record<string, unknown> | null;
}
