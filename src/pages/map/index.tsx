import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router';
import { MapPage } from 'widgets/MapCore/ui/core';

export default function MapRouterPage() {
	const params = useParams();

	return <MapPage mapHash={params.hash} />;
}
