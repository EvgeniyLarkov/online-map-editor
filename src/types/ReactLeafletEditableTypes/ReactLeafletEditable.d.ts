import { Map as LeafletMap } from 'leaflet';
import React, { type ReactNode } from 'react';

export interface ReactLeafletEditableProps {
	children?: ReactNode;
}
export declare const ReactLeafletEditable: React.ForwardRefExoticComponent<
	ReactLeafletEditableProps & React.RefAttributes<LeafletMap>
>;
