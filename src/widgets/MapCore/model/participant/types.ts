export interface MapParticipant {
	hash: string | null;
	mapHash: string | null;
	userHash: string | null;
	name: string | null;
	type: mapParticipantTypes | null;
	status: mapParticipantStatuses | null;
	special_permissions: Record<string, unknown> | null;
	version: number | null;
	createdAt: Date | null;
	deletedAt?: Date | null;
}

export const MAP_PARTICIPANT_TYPE = {
	viewer: 0,
	editor: 1,
	moderator: 2,
	creator: 3,
	admin: 4,
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
	set: (data: MapParticipant) => void;
};

export type MapParticipantStore = MapParticipant & MapParticipantStoreActions;
