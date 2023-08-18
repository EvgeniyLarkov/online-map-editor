import { WithNull } from 'shared/types';

export interface MapParticipant {
	hash: string;
	mapHash: string;
	userHash: string;
	participantHash: string;
	name: string;
	type: mapParticipantTypes;
	status: mapParticipantStatuses;
	special_permissions: Record<string, unknown>;
	version: number;
	createdAt: Date;
	deletedAt?: Date;
}

type MapParticipantVariables = WithNull<MapParticipant>;

export const MAP_PARTICIPANT_TYPE = {
	viewer: 0,
	editor: 10,
	moderator: 20,
	admin: 30,
	creator: 40,
} as const;

type MAP_PARTICIPANT_TYPE_KEYS = keyof typeof MAP_PARTICIPANT_TYPE;
export type mapParticipantTypes =
	typeof MAP_PARTICIPANT_TYPE[MAP_PARTICIPANT_TYPE_KEYS];

export const MAP_PARTICIPANT_STATUS = {
	default: 0,
	banned: -1,
} as const;

type MAP_PARTICIPANT_STATUS_KEYS = keyof typeof MAP_PARTICIPANT_STATUS;
export type mapParticipantStatuses =
	typeof MAP_PARTICIPANT_STATUS[MAP_PARTICIPANT_STATUS_KEYS];

type MapParticipantStoreActions = {
	clear: () => void;
	set: (data: Partial<MapParticipant>) => void;
};

export type MapParticipantStoreType = MapParticipantVariables &
	MapParticipantStoreActions;
