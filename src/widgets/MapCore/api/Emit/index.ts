import { useSockets } from 'shared/api/transport';
import { MapEventDto, mapsActionNames } from '../types/map.types';

export const useEmit = () => {
	const { send } = useSockets(({ emit }) => ({
		send: emit,
	}));

	return (
		eventName: mapsActionNames,
		mapHash: string,
		eventData?: Omit<MapEventDto, 'mapHash'>
	) => {
		const reqData: MapEventDto | Pick<MapEventDto, 'mapHash'> = {
			mapHash,
			...eventData,
		};

		const req = send({ event: eventName, data: reqData });

		return req;
	};
};
