import { Box } from '@chakra-ui/react';
import { useMapStore } from 'entities/map';
import { getMapByHash } from 'features/map/core/GetMap';
import { LatLng, Map } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { isSuccessRequest } from 'shared/common/isSuccessRequest';

function LocationMarker() {
	const [position, setPosition] = React.useState<LatLng | null>(null);
	const map = useMapEvents({
		click(event) {
			const position = event.latlng;
		},
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});

	return position === null ? null : <Marker position={position} />;
}

function DisplayPosition({ map }) {
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
	const [map, setMap] = React.useState<Map | null>(null);
	const { setMapData, mapName } = useMapStore((mapData) => ({
		setMapData: mapData.update,
		mapName: mapData.name,
	}));

	React.useEffect(() => {
		console.log(hash);

		getMapByHash(hash || '').then((res) => {
			if (isSuccessRequest(res)) {
				setMapData(res);
			} else {
				console.log(res);
				// TO-DO
			}
		});
	}, [hash]);

	const displayMap = React.useMemo(
		() => (
			<MapContainer
				center={[59.8676, 30.7755]}
				zoom={10}
				id="map"
				scrollWheelZoom
				ref={setMap}
			>
				<TileLayer
					attribution={mapName || ''}
					url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
				/>
				<LocationMarker />
			</MapContainer>
		),
		[mapName]
	);

	return (
		<div>
			{map ? <DisplayPosition map={map} /> : null}
			{displayMap}
		</div>
	);
}
