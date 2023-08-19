import { MapAction } from 'entities/map-actions';
import { MapParticipant } from 'entities/map-participant';

export type JoinMapResponseDTO = {
	actions: MapAction[];
	participants: MapParticipant[];
	mapHash: string;
};

export type ParticipantLeaveResponseDTO = {
	participantHash: string;
};

export type ParticipantJoinResponseDTO = {
	mapHash: string;
	participant: MapParticipant;
};
