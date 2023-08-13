import { shallow } from 'zustand/shallow';
import { useMapActionsStore } from 'entities/map-actions';
import React from 'react';
import { MAP_EVENTS, MapEventGetActionsDTO } from 'widgets/MapCore/api/types';
import { useSockets } from 'shared/api/transport';
import {
	useMapParticipantStore,
	useMapPermissionsStore,
} from 'widgets/MapCore/model';

export function useMapJoinControllerReciever() {
	const { addActions } = useMapActionsStore(
		(state) => ({
			addActions: state.add,
		}),
		shallow
	);

	const { addParticipant } = useMapParticipantStore(
		(state) => ({
			addParticipant: state.set,
		}),
		shallow
	);

	const { addPermissions } = useMapPermissionsStore(
		(state) => ({
			addPermissions: state.set,
		}),
		shallow
	);

	const { io } = useSockets(
		(state) => ({
			io: state.io,
		}),
		shallow
	);

	React.useEffect(() => {
		const onGetActionsListener = (data: MapEventGetActionsDTO) => {
			addActions(data.actions);
			addParticipant(data.participant);
			addPermissions(data.permissions);
		};

		io?.on(MAP_EVENTS.get_actions, onGetActionsListener);

		return () => {
			io?.off(MAP_EVENTS.get_actions, onGetActionsListener);
		};
	}, [io]);
}
