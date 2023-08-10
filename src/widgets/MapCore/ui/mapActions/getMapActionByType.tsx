import { MAP_ACTION_TYPES } from 'entities/map-actions';
import { MapAction, mapActionTypes } from 'entities/map-actions/model/types';
import React from 'react';
import { LocationMarker } from './Marker/Marker';

type returnActionNodeFunctionType = (
	props: React.ComponentPropsWithoutRef<React.ElementType> & {
		action: MapAction;
	}
) => React.JSX.Element | null;

export function GetMapActionByType(action: MapAction) {
	const { type } = action;

	const actionsByType = {
		[MAP_ACTION_TYPES.marker]: LocationMarker,
		[MAP_ACTION_TYPES.initial_position]: LocationMarker,
	};

	return actionsByType[type] ? actionsByType[type] : null;
}
