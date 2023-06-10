import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const MapPage = lazy(() => import('./map'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MapPage />,
	},
]);
