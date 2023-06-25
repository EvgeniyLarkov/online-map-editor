import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router';
import { MainOverlayMapMenu } from 'widgets/MainOverlayMapMenu';
import { MapCore } from 'widgets/MapCore';

function MapPage() {
	const params = useParams();

	return (
		<>
			<MainOverlayMapMenu />
			<MapCore hash={params.hash} />
		</>
	);
}

export default MapPage;
