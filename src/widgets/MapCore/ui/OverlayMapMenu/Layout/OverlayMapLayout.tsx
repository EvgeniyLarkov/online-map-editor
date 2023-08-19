import React from 'react';
import { ActionsMenu } from '../ActionsMenu/ActionsMenu';
import { MapSettingsSidemenu } from '../MapSettings';
import { ParticipantsModule } from '../ParticipantsModule';

export function OverlayMapLayout() {
	return (
		<>
			<MapSettingsSidemenu />
			<ActionsMenu />
			<ParticipantsModule />
		</>
	);
}
