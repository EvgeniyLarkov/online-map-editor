import { OMEMap } from 'entities/map';
import {
	MapParticipant,
	ParticipantMapPermissions,
} from 'widgets/MapCore/model';

export type connectToMapDTO = {
	map: OMEMap;
	participant: MapParticipant;
	permissions: ParticipantMapPermissions;
};
