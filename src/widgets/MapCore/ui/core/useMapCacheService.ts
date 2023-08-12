import { LatLngTuple, Map } from 'leaflet';
import React from 'react';
import { useBeforeUnload } from 'react-router-dom';

export function useMapCacheController(map: Map | null, mapHash: string | null) {
	const mapInitialCoordinates = React.useMemo<LatLngTuple>(() => {
		const baseCoords = [59.8676, 30.7755] as LatLngTuple;
		if (mapHash) {
			const coordsRaw = window.localStorage.getItem(`${mapHash}.last_pos`);
			if (coordsRaw) {
				try {
					return JSON.parse(coordsRaw);
				} catch (err) {
					return baseCoords;
				}
			} else {
				return baseCoords;
			}
		}
		return baseCoords;
	}, [mapHash]);

	const mapInitialZoom = React.useMemo<number>(() => {
		const baseZoom = 15;
		if (mapHash) {
			const zoomRaw = window.localStorage.getItem(`${mapHash}.zoom`);
			if (zoomRaw) {
				try {
					const zoom = Number.parseInt(zoomRaw, 10);
					return !Number.isNaN(zoom) && zoom > 0 ? zoom : baseZoom;
				} catch (err) {
					return baseZoom;
				}
			} else {
				return baseZoom;
			}
		}
		return baseZoom;
	}, [mapHash]);

	useBeforeUnload(
		React.useCallback(() => {
			if (map && mapHash) {
				const latlng = map.getCenter();
				const zoom = map.getZoom();

				const latlngToSave = [latlng.lat, latlng.lng];

				window.localStorage.setItem(
					`${mapHash}.last_pos`,
					JSON.stringify(latlngToSave)
				);
				window.localStorage.setItem(`${mapHash}.zoom`, zoom.toString());
			}
		}, [map, mapHash])
	);

	return [mapInitialCoordinates, mapInitialZoom] as const;
}
