import { useSession } from 'entities/session';
import { router } from 'pages';
import React from 'react';
import { RouterProvider } from 'react-router';
import { useSockets } from 'shared/api/transport';
import { SOCKET_NAMESPACES } from 'shared/api/transport/websockets/types';

function App() {
	const { isAuthorized, key } = useSession((session) => ({
		isAuthorized: session.isAuthorized,
		key: session.accessToken,
	}));

	const {
		handleConnectToSockets,
		handleDisconnect,
		isConnected,
		socketConnecting,
	} = useSockets((sockets) => ({
		handleConnectToSockets: sockets.handleConnect,
		isConnected: sockets.isConnected,
		handleDisconnect: sockets.handleDisconnect,
		socketConnecting: sockets.connecting,
	}));

	const getToken = () => key || '';

	if (isAuthorized) {
		if (!socketConnecting && !isConnected())
			handleConnectToSockets(getToken, SOCKET_NAMESPACES.map);
	} else {
		handleDisconnect();
	}

	return <RouterProvider router={router} />;
}

export default App;
