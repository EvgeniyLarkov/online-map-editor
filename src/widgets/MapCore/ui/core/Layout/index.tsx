import React from 'react';
import { MapUserMenu } from '../../OverlayMapMenu';

export function MapLayout({ children }) {
	return (
		<>
			{children}
			<MapUserMenu />
		</>
	);
}
