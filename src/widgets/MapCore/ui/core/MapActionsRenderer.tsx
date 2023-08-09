import { shallow } from 'zustand/shallow';
import { useMapActionsStore } from 'entities/map-actions';
import React from 'react';
import { GetMapActionByType } from '../mapActions/getMapActionByType';

export function MapActionsRenderer() {
	const { actionsList, actionsByHash } = useMapActionsStore(
		(state) => ({
			actionsList: state.actionsList,
			actionsByHash: state.actionsByHash,
		}),
		shallow
	);

	return (
		<>
			{actionsList.map((actionHash: string) => {
				const action = actionsByHash[actionHash];
				const ActionElement = GetMapActionByType(action);

				return ActionElement ? (
					<ActionElement action={action} key={actionHash} />
				) : null;
			})}
		</>
	);
}
