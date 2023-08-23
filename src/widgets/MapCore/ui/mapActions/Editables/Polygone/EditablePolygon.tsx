import { PolygoneData } from 'entities/map-actions';
import { LatLng, LeafletEventHandlerFnMap, LeafletMouseEvent } from 'leaflet';
import React, { useEffect } from 'react';
import { CircleMarker, MarkerProps, Polygon, useMap } from 'react-leaflet';
import { calcLatLngCenter } from 'shared/common/calcLatLngCenter';

export function EditablePolygone({
	coordinates,
	children,
	onChange,
	...rest
}: {
	coordinates: LatLng[];
	onChange: (coordinates?: LatLng, data?: PolygoneData) => void;
} & React.PropsWithChildren &
	Omit<MarkerProps, 'position'>) {
	const [editing, setEditing] = React.useState(false);
	const [draggingInter, setDraggingInter] = React.useState(false);
	const [draggingCorner, setDraggingCorner] = React.useState(false);

	const [coords, setCoords] = React.useState<LatLng[]>([...coordinates]);
	const [interPoints, setInterPoints] = React.useState<LatLng[]>([...coords]);
	const [cornerPoints, setCornerPoints] = React.useState<LatLng[]>([...coords]);
	const map = useMap();

	React.useLayoutEffect(() => {
		if (!draggingInter) {
			setInterPoints([...coords]);
		}
	}, [coords, draggingInter]);

	React.useLayoutEffect(() => {
		if (!draggingInter) {
			setCornerPoints([...coords]);
		}
	}, [coords, draggingInter]);

	React.useEffect(() => {
		if (!draggingCorner && !draggingInter) {
			onChange(calcLatLngCenter(coords), {
				coordinates: coords,
			});
		}
	}, [coords, onChange, draggingCorner, draggingInter]);

	const intermidiatePoints = React.useMemo(() => {
		return interPoints.map((item, index) => {
			const a =
				index === 0
					? interPoints[interPoints.length - 1]
					: interPoints[index - 1];
			const b = item;

			const latDiff = a.lat - b.lat;
			const lngDiff = a.lng - b.lng;

			return {
				lat: a.lat - latDiff / 2,
				lng: a.lng - lngDiff / 2,
			};
		});
	}, [interPoints]);

	// const interMouseMoveRef = React.useRef<>(null);
	const interEventHandlers = React.useCallback(
		(index: number) => ({
			mousedown: () => {
				map.dragging.disable();
				const point = interPoints[index];
				setDraggingInter(true);

				const coordIndex = index;
				setCoords((state) => {
					const newState = [...state];
					newState.splice(index, 0, point);
					return [...newState];
				});

				const onMouseMove = (ev: LeafletMouseEvent) => {
					setCoords((state) => {
						const newState = [...state];
						newState[coordIndex] = ev.latlng;
						return [...newState];
					});
				};

				const onMouseUp = () => {
					map.dragging.enable();
					setDraggingInter(false);
					map.removeEventListener('mousemove', onMouseMove);
					map.removeEventListener('mouseup', onMouseUp);
				};

				// Remove event listeners on object stop dragging
				map.on('mousemove', onMouseMove);
				map.on('mouseup', onMouseUp);
			},
		}),
		[map, interPoints]
	);

	const intermidiateElements = React.useMemo(() => {
		return intermidiatePoints.map((item, index) => {
			return (
				<CircleMarker
					key={`inter_${item.lat}${item.lng}`}
					center={item}
					color="white"
					opacity={0.7}
					fillOpacity={0.7}
					eventHandlers={interEventHandlers(index)}
					fillColor="white"
					radius={5}
				/>
			);
		});
	}, [intermidiatePoints, interEventHandlers]);

	const cornerEventHandlers = React.useCallback(
		(index: number) => ({
			mousedown: () => {
				map.dragging.disable();
				setDraggingCorner(true);

				const onMouseMove = (ev: LeafletMouseEvent) => {
					setCoords((state) => {
						const newState = [...state];
						newState[index] = ev.latlng;
						return [...newState];
					});
				};

				const onMouseUp = () => {
					map.dragging.enable();
					setDraggingCorner(false);
					map.removeEventListener('mousemove', onMouseMove);
					map.removeEventListener('mouseup', onMouseUp);
				};

				map.on('mouseup', onMouseUp);
				map.on('mousemove', onMouseMove);
			},
			click: () => {
				setCoords((state) => {
					const newState = [...state];
					newState.splice(index, 1);
					return [...newState];
				});
			},
		}),
		[map]
	);

	useEffect(() => {
		return () => {
			if ((draggingCorner || draggingInter) && map) {
				map.dragging.enable();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const cornerElements = React.useMemo(() => {
		return cornerPoints.map((item, index) => {
			return (
				<CircleMarker
					key={`corner_${item.lat}${item.lng}`}
					center={item}
					color="white"
					opacity={1}
					eventHandlers={cornerEventHandlers(index)}
					fillOpacity={1}
					fillColor="white"
					radius={5}
				/>
			);
		});
	}, [cornerPoints, cornerEventHandlers]);

	const eventHandlers: LeafletEventHandlerFnMap = React.useMemo(
		() => ({
			click: () => {
				setEditing((state) => !state);
			},
		}),
		[]
	);

	return (
		<>
			<Polygon positions={coords} {...rest} eventHandlers={eventHandlers}>
				{children}
			</Polygon>
			{editing ? (
				<>
					{intermidiateElements}
					{cornerElements}
				</>
			) : null}
		</>
	);
}
