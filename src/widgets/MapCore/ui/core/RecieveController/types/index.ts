import { MapAction } from 'entities/map-actions';
import { MapParticipant } from 'entities/map-participant';

export type JoinMapResponseDTO = {
	actions: MapAction[];
	participants: MapParticipant[];
	mapHash: string;
};
