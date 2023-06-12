import { io, Socket } from 'socket.io-client';

import { create } from 'zustand';
import { serverHost, serverPort } from 'shared/api/config';
import { useSocketStore } from './types';

export const useSockets = create<useSocketStore>((set, get) => ({
	io: null,
	connecting: false,
	handleConnect: async (getToken: () => string) => {
		const connection = io(
			`http://${serverHost}:${serverPort}/chat`, // TO-DO peredelat
			{
				extraHeaders: {
					Authorization: `Bearer ${getToken()}`,
				},
			}
		);

		set(() => ({ connecting: true }));

		console.log(`Connecting to socket server ${serverHost}:${serverPort} ⌛`);

		connection.on('connect', () => {
			set(() => ({ io: connection, connecting: false }));
			console.log(`Connected to socket server ${serverHost}:${serverPort} 🟢`);
		});

		connection.on('disconnect', () => {
			set(() => ({ io: null, connecting: false }));
			console.log(
				`Disconnected from socket server ${serverHost}:${serverPort} ⛔`
			);
		});
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
			'chat',
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
