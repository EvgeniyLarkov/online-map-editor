import { io, Socket } from 'socket.io-client';

import { create } from 'zustand';
import { serverHost, serverPort } from 'shared/api/config';
import {
	onConnectedResponseDTO,
	SOCKET_NAMESPACES,
	SOCKET_SERVICE_EVENTS,
	useSocketStore,
} from './types';

export const useSockets = create<useSocketStore>((set, get) => ({
	io: null,
	connecting: false,
	namespace: null,
	handleConnect: async (getToken, namespace = SOCKET_NAMESPACES.map) => {
		const connection = io(`http://${serverHost}:${serverPort}/${namespace}`, {
			extraHeaders: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		set(() => ({ connecting: true }));

		console.log(`Connecting to socket server ${serverHost}:${serverPort} ⌛`);

		connection.on('connect', () => {
			set(() => ({ io: connection, connecting: false, namespace }));
			console.log(`Connected to socket server ${serverHost}:${serverPort} 🟢`);
		});

		connection.on('disconnect', (event) => {
			console.log(event);
			set(() => ({ io: null, connecting: false, namespace: null }));
			console.log(
				`Disconnected from socket server ${serverHost}:${serverPort} ⛔`
			);
		});
	},
	handleAnonConnect: async (getToken, namespace = SOCKET_NAMESPACES.map) => {
		const connection = io(`http://${serverHost}:${serverPort}/${namespace}`, {
			extraHeaders: {
				'anonymous-id': getToken(),
			},
		});

		set(() => ({ connecting: true }));

		console.log(
			`Connecting to socket server as anon ${serverHost}:${serverPort} ⌛`
		);

		connection.on(SOCKET_SERVICE_EVENTS.connect, () => {
			set(() => ({ io: connection, connecting: false, namespace }));
			console.log(
				`Connected to socket server as anon ${serverHost}:${serverPort} 🟢`
			);
		});

		connection.on(SOCKET_SERVICE_EVENTS.disconnect, (event) => {
			console.log(event);
			set(() => ({ io: null, connecting: false, namespace: null }));
			console.log(
				`Disconnected from socket server as anon ${serverHost}:${serverPort} ⛔`
			);
		});

		// connection.on(
		// 	SOCKET_SERVICE_EVENTS.on_connect,
		// 	(data: onConnectedResponseDTO) => {
		// 		return data;
		// 	}
		// );
	},
	handleDisconnect: async () => {
		const thisIo = get().io;

		if (thisIo) {
			thisIo.close();
		}
	},
	isConnected: () => {
		const thisIo = get().io;

		return !!thisIo && thisIo.connected;
	},
	emit: async (options) => {
		const { event, data } = options;

		console.log(
			'emit to namespasce: ',
			get().namespace,
			' event: ',
			event,
			'data:',
			data
		);

		const thisIo = get().io;

		if (thisIo) {
			return thisIo.emit(event, ...[data]);
		}
		return null;
	},
}));
