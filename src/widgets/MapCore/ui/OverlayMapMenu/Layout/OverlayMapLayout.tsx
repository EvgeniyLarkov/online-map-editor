import React from 'react';
import { ActionsMenu } from '../ActionsMenu/ActionsMenu';
import { MapSettingsSidemenu } from '../MapSettings';

export function OverlayMapLayout() {
	return (
		<>
			<MapSettingsSidemenu />
			<ActionsMenu />
		</>
	);
}
