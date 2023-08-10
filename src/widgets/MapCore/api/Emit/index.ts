import { useSockets } from 'shared/api/transport';
import { useCallback } from 'react';
import {
	ChangeMapEventDto,
	MapEventDto,
	mapsActionNames,
} from '../types/map.types';

export const useEmit = () => {
	const { send } = useSockets(({ emit }) => ({
		send: emit,
	}));

	return useCallback(
		(
			eventName: mapsActionNames,
			mapHash: string,
			eventData?:
				| Omit<MapEventDto, 'mapHash'>
				| Omit<ChangeMapEventDto, 'mapHash'>
		) => {
			const reqData:
				| MapEventDto
				| Pick<MapEventDto, 'mapHash'>
				| ChangeMapEventDto = {
				mapHash,
				...eventData,
			};

			const req = send({ event: eventName, data: reqData });

			return req;
		},
		[send]
	);
};
