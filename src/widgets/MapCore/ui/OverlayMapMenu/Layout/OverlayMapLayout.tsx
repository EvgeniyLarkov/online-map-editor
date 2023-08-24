import React from 'react';
import { ActionsMenu } from '../ActionsMenu/ActionsMenu';
import { MapSettingsSidemenu } from '../MapSettings';
import { ParticipantsModule } from '../ParticipantsModule';
import { ActionMenu } from '../../mapActions';

export function OverlayMapLayout() {
	return (
		<>
			<MapSettingsSidemenu />
			<ActionsMenu />
			<ActionMenu />
			<ParticipantsModule />
		</>
	);
}
