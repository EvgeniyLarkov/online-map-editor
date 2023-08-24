import { MapStore } from 'entities/map';
import { MapActionsStore } from 'entities/map-actions';
import React from 'react';
import { MapEditingUIStore } from 'widgets/MapCore/model';
import { ActionMenuForm } from './ActionMenuForm';

export function ActionMenu() {
	const { actionHash } = MapEditingUIStore((state) => ({
		actionHash: state.action,
	}));

	const { actionsByHash } = MapActionsStore((state) => ({
		actionsByHash: state.actionsByHash,
	}));

	const { mapHash } = MapStore((mapData) => ({
		mapHash: mapData.hash,
	}));

	const action = React.useMemo(() => {
		return actionHash ? actionsByHash[actionHash] : null;
	}, [actionsByHash, actionHash]);

	return action && mapHash ? (
		<ActionMenuForm mapHash={mapHash} action={action} />
	) : null;
}
