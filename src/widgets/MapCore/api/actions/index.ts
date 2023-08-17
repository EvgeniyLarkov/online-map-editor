import { useSockets } from 'shared/api/transport';
import { useCallback } from 'react';
import { ChangeMapActionDto, MapActionDto } from 'entities/map-actions';
import { mapsActionNames } from '../types';

export const useEmit = () => {
	const { send } = useSockets(({ emit }) => ({
		send: emit,
	}));

	return useCallback(
		(
			eventName: mapsActionNames,
			mapHash: string,
			eventData?:
				| Omit<MapActionDto, 'mapHash'>
				| Omit<ChangeMapActionDto, 'mapHash'>
		) => {
			const reqData:
				| MapActionDto
				| Pick<MapActionDto, 'mapHash'>
				| ChangeMapActionDto = {
				mapHash,
				...eventData,
			};

			const req = send({ event: eventName, data: reqData });

			return req;
		},
		[send]
	);
};
