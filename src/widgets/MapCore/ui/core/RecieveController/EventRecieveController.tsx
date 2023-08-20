import { shallow } from 'zustand/shallow';
import { MapAction, MapActionsStore } from 'entities/map-actions';
import React from 'react';
import { MAP_EVENTS } from 'widgets/MapCore/api/types';
import { useSockets } from 'shared/api/transport';
import { MapParticipantsStore } from 'entities/map-participants';
import { MapParticipant, MapParticipantStore } from 'entities/map-participant';
import {
	MapPermissionEntity,
	MapPermissionsStore,
} from 'entities/map-permissions';
import { MapStore, OMEMap } from 'entities/map';
import {
	ParticipantJoinResponseDTO,
	ParticipantLeaveResponseDTO,
} from './types';

export function useEventRecieveController() {
	const { addActions, dropActions } = MapActionsStore(
		(state) => ({
			addActions: state.add,
			dropActions: state.drop,
		}),
		shallow
	);

	const { addParticipant, dropParticipant } = MapParticipantsStore((state) => ({
		addParticipant: state.add,
		dropParticipant: state.drop,
	}));

	const { participantHash, setSelfParticipant } = MapParticipantStore(
		(state) => ({
			participantHash: state.participantHash,
			setSelfParticipant: state.set,
		})
	);

	const updateMap = MapStore((state) => state.update);
	const updateMapPermissions = MapPermissionsStore((state) => state.set);

	const { io } = useSockets(
		(state) => ({
			io: state.io,
		}),
		shallow
	);

	React.useEffect(() => {
		const onModifyActionsListener = (data: MapAction[]) => {
			addActions(data);
		};

		const onDropActionsListender = (data: MapAction[]) => {
			dropActions(data);
		};

		const onNewParticipantJoin = (data: ParticipantJoinResponseDTO) => {
			addParticipant(data.participant);
		};

		const onMapPermissionsChange = (data: Partial<MapPermissionEntity>) => {
			updateMapPermissions(data);
		};

		const onParticipantLeave = (data: ParticipantLeaveResponseDTO) => {
			dropParticipant(data.participantHash);
		};

		const onParticipantChange = (data: MapParticipant) => {
			addParticipant(data);

			const participants = Array.isArray(data) ? data : [data];

			participants.forEach((item) => {
				if (item.participantHash === participantHash) {
					setSelfParticipant(data);
				}
			});
		};

		const onMapPropertiesChange = (data: OMEMap) => {
			updateMap(data);
		};

		io?.on(MAP_EVENTS.new_action, onModifyActionsListener); // TO-DO add types check (DTOs) and error handling
		io?.on(MAP_EVENTS.drop_action, onDropActionsListender);
		io?.on(MAP_EVENTS.change_action, onModifyActionsListener);
		io?.on(MAP_EVENTS.participant_join, onNewParticipantJoin);
		io?.on(MAP_EVENTS.participant_leave, onParticipantLeave);
		io?.on(MAP_EVENTS.participant_change, onParticipantChange);
		io?.on(MAP_EVENTS.map_change, onMapPropertiesChange);
		io?.on(MAP_EVENTS.map_permissions_change, onMapPermissionsChange);

		return () => {
			io?.off(MAP_EVENTS.new_action, onModifyActionsListener);
			io?.off(MAP_EVENTS.drop_action, onDropActionsListender);
			io?.off(MAP_EVENTS.change_action, onModifyActionsListener);
			io?.off(MAP_EVENTS.participant_join, onNewParticipantJoin);
			io?.off(MAP_EVENTS.participant_leave, onParticipantLeave);
			io?.off(MAP_EVENTS.participant_change, onParticipantChange);
			io?.off(MAP_EVENTS.map_change, onMapPropertiesChange);
			io?.off(MAP_EVENTS.map_permissions_change, onMapPermissionsChange);
		};
	}, [io, participantHash]);
}
