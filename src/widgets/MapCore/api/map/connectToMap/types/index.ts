import { OMEMap } from 'entities/map';
import { MapParticipant } from 'entities/map-participant';
import { MapParticipantPermissions } from 'entities/map-participant-permissions';

export type connectToMapDTO = {
	map: OMEMap;
	participant: MapParticipant;
	permissions: MapParticipantPermissions;
};
