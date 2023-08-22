import { MAP_ACTION_TYPES } from 'entities/map-actions';
import { LatLng, LatLngExpression, LeafletMouseEvent, Map } from 'leaflet';
import React from 'react';
import { Polygon, Polyline } from 'react-leaflet';
import { MAP_EVENTS, useEmit } from 'widgets/MapCore/api';
import { useThrottle } from '@uidotdev/usehooks';
import { isSameCoordinates } from 'shared/common/isSameCoordinates';

export function PolygoneController({
	map,
	mapHash,
	onEndCallback,
}: {
	map: Map;
	mapHash: string;
	onEndCallback: () => void;
}) {
	const [coordinates, setCoordinates] = React.useState<LatLng[]>([]);

	const [editing, setEditing] = React.useState(false);

	const [mousePosition, setMousePosition] = React.useState<null | LatLng>(null);
	const mouseCoords = useThrottle(mousePosition, 10);

	const sendEvent = useEmit();

	const clickListener = React.useCallback(
		(e: LeafletMouseEvent) => {
			const thisCoordinates = e.latlng;

			let sameCoords = false;
			if (coordinates.length > 0) {
				sameCoords = isSameCoordinates(coordinates[0], thisCoordinates);
			}

			if (!sameCoords) {
				setCoordinates((state) => [...state, thisCoordinates]);
				setEditing(true);
			} else {
				setEditing(false);

				sendEvent(MAP_EVENTS.new_action, mapHash, {
					type: MAP_ACTION_TYPES.polygone,
					coordinates: coordinates[0],
					data: {
						coordinates,
					},
				});

				onEndCallback();
			}
		},
		[mapHash, onEndCallback, coordinates, sendEvent]
	);

	React.useEffect(() => {
		map.on('click', clickListener);

		const onMove = (e: LeafletMouseEvent) => {
			return setMousePosition(e.latlng);
		};

		if (editing) {
			map.on('mousemove', onMove);
		} else {
			map.off('mousemove', onMove);
		}

		return () => {
			map.off('click', clickListener);
			map.off('move', onMove);
		};
	}, [map, clickListener, editing]);

	const PolylineLatLng: LatLng[] | null = React.useMemo(() => {
		if (editing && mouseCoords && coordinates[0]) {
			return [...coordinates, mouseCoords];
		}
		if (coordinates.length > 1) {
			return [...coordinates];
		}

		return null;
	}, [editing, mouseCoords, coordinates]);

	return PolylineLatLng ? <Polygon positions={PolylineLatLng} /> : null;
}
