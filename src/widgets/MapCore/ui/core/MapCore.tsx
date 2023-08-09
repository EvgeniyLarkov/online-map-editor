import { Box } from '@chakra-ui/react';
import { useMapStore } from 'entities/map';
import { getMapByHash } from 'features/map/core/GetMap';
import { LatLng, LatLngTuple, Map } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { isSuccessRequest } from 'shared/common/isSuccessRequest';
import { useEmit } from 'widgets/MapCore/api';
import { MAP_EVENTS } from 'widgets/MapCore/api/types/map.types';
import { EventController } from './EventController';

function DisplayPosition({ map }: { map: Map }) {
	const [position, setPosition] = React.useState(() => map.getCenter());

	const onMove = React.useCallback(() => {
		setPosition(map.getCenter());
	}, [map]);

	React.useEffect(() => {
		map.on('move', onMove);
		return () => {
			map.off('move', onMove);
		};
	}, [map, onMove]);

	return (
		<Box
			position="fixed"
			bottom={4}
			right={4}
			bg="gray.100"
			borderRadius={4}
			py={4}
			px={8}
			display="flex"
			alignItems="center"
			gap="1rem"
			shadow="dark-lg"
			sx={{ 'z-index': 'var(--map-overlay-menu-z)' }}
		>
			latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
		</Box>
	);
}

export function MapCore({ hash }: { hash: string | undefined }) {
	const [mapRef, setMapRef] = React.useState<Map | null>(null);
	const [initialLoading, setInitialLoading] = React.useState(true);
	const sendEvent = useEmit();

	const mapInitialCoordinates = React.useMemo(
		() => [59.8676, 30.7755] as LatLngTuple,
		[]
	);
	const mapInitialZoomFactor = 10;
	const mapInitialTileLayer =
		'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';

	// Initialize store
	const { setMapData, mapName } = useMapStore((mapData) => ({
		setMapData: mapData.update,
		mapName: mapData.name,
	}));

	React.useEffect(() => {
		getMapByHash(hash || '')
			.then((res) => {
				if (isSuccessRequest(res)) {
					setMapData(res);
				} else {
					console.log(res);
					// TO-DO
				}
			})
			.finally(() => {
				setInitialLoading(false);
			});
	}, [hash, setMapData]);

	React.useEffect(() => {
		if (hash) {
			sendEvent(MAP_EVENTS.join_map, hash);
		}
	}, [hash, setMapData]);

	return (
		<div>
			{initialLoading ? (
				<div>intial loading</div> // TO-DO
			) : (
				<div>
					{mapRef ? (
						<>
							<DisplayPosition map={mapRef} />
							<EventController map={mapRef} />
						</>
					) : null}
					<MapContainer
						center={mapInitialCoordinates}
						zoom={mapInitialZoomFactor}
						id="map"
						scrollWheelZoom
						ref={setMapRef}
					>
						<TileLayer attribution={mapName || ''} url={mapInitialTileLayer} />
					</MapContainer>
				</div>
			)}
		</div>
	);
}
