import { LatLng } from 'leaflet';
import { mapActionTypes } from '../model/types';
import { OMEActionsData } from '../model/action.types';

export interface MapActionDto {
	hash?: string;
	mapHash: string;
	type: mapActionTypes;
	coordinates?: LatLng;
	data?: OMEActionsData;
}

export interface ChangeMapActionDto {
	hash: string;
	mapHash: string;
	type?: mapActionTypes;
	coordinates?: LatLng;
	data?: OMEActionsData;
}
