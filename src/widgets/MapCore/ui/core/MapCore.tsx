/* eslint-disable prefer-const */
import { Box } from '@chakra-ui/react';
import { useMapStore } from 'entities/map';
import { getMapByHash } from 'features/map/core/GetMap';
import { LatLngTuple, Map } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { isSuccessRequest } from 'shared/common/isSuccessRequest';
import { useEmit } from 'widgets/MapCore/api';
import { MAP_EVENTS } from 'widgets/MapCore/api/types/map.types';
import { EventDispatchController } from './EventDispatchController';
import { useEventRecieveController } from './EventRecieveController';
import { MapActionsRenderer } from './MapActionsRenderer';
import { OverlayMapLayout } from '../OverlayMapMenu';

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

function MapCorePure({ hash }: { hash: string | undefined }) {
	const [mapRef, setMapRef] = React.useState<Map | null>(null);
	const [initialLoading, setInitialLoading] = React.useState(true);
	const sendEvent = useEmit();

	// Handles Recieving events via websockets
	useEventRecieveController();

	let mapInitialCoordinates = React.useMemo(
		() => [59.8676, 30.7755] as LatLngTuple,
		[]
	);
	let mapInitialZoomFactor = 14;
	let mapInitialTileLayer = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';

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

		return () => {
			if (hash) {
				sendEvent(MAP_EVENTS.leave_map, hash);
			}
		};
	}, [hash, sendEvent]);

	return (
		<>
			{initialLoading ? (
				<div>intial loading</div> // TO-DO
			) : null}
			{mapRef ? (
				<>
					<DisplayPosition map={mapRef} />
					<EventDispatchController map={mapRef} />
				</>
			) : null}
			<OverlayMapLayout />
			<MapContainer
				center={mapInitialCoordinates}
				zoom={mapInitialZoomFactor}
				id="map"
				scrollWheelZoom
				ref={setMapRef}
			>
				<TileLayer attribution={mapName || ''} url={mapInitialTileLayer} />
				<MapActionsRenderer />
			</MapContainer>
		</>
	);
}

MapCorePure.whyDidYouRender = true;
export const MapCore = React.memo(MapCorePure);
