import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router';
import { MapCore } from 'widgets/MapCore';

function MapPage() {
	const params = useParams();

	return <MapCore hash={params.hash || null} />;
}

export default MapPage;
