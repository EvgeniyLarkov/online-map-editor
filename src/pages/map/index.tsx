import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapPage() {
	return (
		<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom id="map">
			<TileLayer
				attribution="Aboba 123"
				url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
}

export default MapPage;
