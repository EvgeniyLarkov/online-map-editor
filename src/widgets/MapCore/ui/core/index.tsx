import React from 'react';
import { MapJoinController } from './JoinController';
import { MapLayout } from './Layout';

export function MapPage({ mapHash }: { mapHash?: string }) {
	return (
		<MapLayout>
			<MapJoinController mapHash={mapHash} />
		</MapLayout>
	);
}
