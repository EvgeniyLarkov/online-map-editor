import { LatLng } from 'leaflet';
import { mapActionTypes } from '../model/types';

export interface MapActionDto {
	hash?: string;
	mapHash: string;
	type: mapActionTypes;
	coordinates?: LatLng;
	data?: Record<string, unknown>;
}

export interface ChangeMapActionDto {
	hash: string;
	mapHash: string;
	type?: mapActionTypes;
	coordinates?: LatLng;
	data?: Record<string, unknown>;
}
