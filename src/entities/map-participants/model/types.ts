import { MapParticipant } from 'entities/map-participant';

export type MapParticipantsVariables = {
	paricipantsList: string[];
	paricipantsByHash: Record<string, MapParticipant>;
};

type MapParticipantsStoreActions = {
	add: (data: MapParticipant | MapParticipant[]) => void;
	drop: (
		data: MapParticipant | MapParticipant[] | MapParticipant['hash']
	) => void;
	clear: () => void;
};

export type MapParticipantsStoreType = MapParticipantsVariables &
	MapParticipantsStoreActions;
