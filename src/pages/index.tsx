import { NotificationsModule } from 'features/notifications';
import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const MapPage = lazy(() => import('./map'));

// TO-DO provide 404 page
export const router = createBrowserRouter([
	{
		path: '/map/:hash',
		element: (
			<>
				<MapPage />
				<NotificationsModule />
			</>
		),
	},
	{
		path: '/',
		element: (
			<>
				<MapPage />
				<NotificationsModule />
			</>
		),
	},
]);
