import '../shared/libs/wdyr';

import { useSession } from 'entities/session';
import { router } from 'pages';
import React from 'react';
import { RouterProvider } from 'react-router';
import { useSockets } from 'shared/api/transport';

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
		if (!socketConnecting && !isConnected()) handleConnectToSockets(getToken);
	} else {
		handleDisconnect();
	}

	return <RouterProvider router={router} />;
}

export default App;
