import { SessionStore, getAnonId } from 'entities/session';
import { router } from 'pages';
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { useSockets } from 'shared/api/transport';
import {
	SOCKET_NAMESPACES,
	SOCKET_SERVICE_EVENTS,
	onConnectedResponseDTO,
} from 'shared/api/transport/websockets/types';

function App() {
	const { isAuthorized, key, anonId, setSessionData } = SessionStore(
		(session) => ({
			isAuthorized: session.isAuthorized,
			key: session.accessToken,
			anonId: session.anonId,
			setSessionData: session.setSessionData,
		})
	);

	const {
		handleConnectToSockets,
		handleConnectToSocketsAnon,
		isConnected,
		socketConnecting,
		connection,
	} = useSockets((sockets) => ({
		handleConnectToSockets: sockets.handleConnect,
		handleConnectToSocketsAnon: sockets.handleAnonConnect,
		isConnected: sockets.isConnected,
		handleDisconnect: sockets.handleDisconnect,
		socketConnecting: sockets.connecting,
		connection: sockets.io,
	}));

	const getToken = () => key || '';
	const getAnonIdFromStore = () => anonId || '';

	if (isAuthorized) {
		if (!socketConnecting && !isConnected())
			handleConnectToSockets(getToken, SOCKET_NAMESPACES.map);
	} else if (!socketConnecting && !isConnected() && anonId) {
		handleConnectToSocketsAnon(getAnonIdFromStore, SOCKET_NAMESPACES.map);
	}

	useEffect(() => {
		if (!isAuthorized && !anonId) {
			const req = getAnonId();
			req
				.then((data) => {
					setSessionData({ anonId: data.data });
				})
				.catch(() => {});

			return () => {
				req.abort();
			};
		}

		return () => {};
	}, [anonId, isAuthorized, setSessionData]);

	useEffect(() => {
		const onRecieveConnectionData = (data: onConnectedResponseDTO) => {
			setSessionData(data);
		};

		console.log('connection changed');
		connection?.on(SOCKET_SERVICE_EVENTS.on_connect, onRecieveConnectionData);

		// return () => {
		// 	connection?.off(
		// 		SOCKET_SERVICE_EVENTS.on_connect,
		// 		onRecieveConnectionData
		// 	);
		// };
	}, [connection, setSessionData]);

	return <RouterProvider router={router} />;
}

export default App;
