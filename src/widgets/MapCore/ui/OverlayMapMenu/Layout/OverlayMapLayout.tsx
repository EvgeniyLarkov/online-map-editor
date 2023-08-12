import React from 'react';
import { ActionsMenu } from '../ActionsMenu/ActionsMenu';
import { MapUserMenu } from '../UserMenu';

export function OverlayMapLayout() {
	return (
		<>
			<ActionsMenu /> <MapUserMenu />
		</>
	);
}
