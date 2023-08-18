import { MapAction } from 'entities/map-actions';
import { MapParticipant } from 'widgets/MapCore/model';

export type JoinMapResponseDTO = {
	actions: MapAction[];
	participants: MapParticipant[];
	mapHash: string;
};
