import { LatLng, LeafletEventHandlerFnMap } from 'leaflet';
import React from 'react';
import { Circle, CircleMarker, MarkerProps, Polygon } from 'react-leaflet';

export function EditablePolygone({
	coordinates,
	children,
	...rest
}: {
	coordinates: LatLng[];
} & React.PropsWithChildren &
	Omit<MarkerProps, 'position'>) {
	const [editing, setEditing] = React.useState(false);
	const [coords, setCoords] = React.useState<LatLng[]>([...coordinates]);

	const intermidiatePoints = React.useMemo(() => {
		return coords.map((item, index) => {
			const a = index === 0 ? coords[coords.length - 1] : coords[index - 1];
			const b = item;

			const latDiff = a.lat - b.lat;
			const lngDiff = a.lng - b.lng;

			return {
				lat: a.lat - latDiff / 2,
				lng: a.lng - lngDiff / 2,
			};
		});
	}, [coords]);

	const intermidiateElements = React.useMemo(() => {
		return intermidiatePoints.map((item) => {
			return (
				<CircleMarker
					key={`${item.lat}${item.lng}`}
					center={item}
					color="white"
					opacity={0.7}
					fillOpacity={0.7}
					fillColor="white"
					radius={5}
				/>
			);
		});
	}, [intermidiatePoints]);

	const cornerElements = React.useMemo(() => {
		return coords.map((item) => {
			return (
				<CircleMarker
					key={`${item.lat}${item.lng}`}
					center={item}
					color="white"
					opacity={1}
					fillOpacity={1}
					fillColor="white"
					radius={5}
				/>
			);
		});
	}, [coords]);

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
			<Polygon positions={coordinates} {...rest} eventHandlers={eventHandlers}>
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
