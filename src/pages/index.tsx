import { NotificationsModule } from 'features/notifications';
import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const MapRouterPage = lazy(() => import('./map'));

// TO-DO provide 404 page
export const router = createBrowserRouter([
	{
		path: '/map/:hash',
		element: (
			<>
				<MapRouterPage />
				<NotificationsModule />
			</>
		),
	},
	{
		path: '/',
		element: (
			<>
				<MapRouterPage />
				<NotificationsModule />
			</>
		),
	},
]);
