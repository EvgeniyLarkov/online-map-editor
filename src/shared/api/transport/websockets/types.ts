import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';

type useSocketsStateActions = {
	handleConnect: (
		getToken: () => string,
		namespace: SocketNamespaces
	) => Promise<void>;
	handleDisconnect: () => void;
	handleAnonConnect: (
		getToken: () => string,
		namespace: SocketNamespaces
	) => Promise<void>;
	isConnected: () => boolean;
	emit: (options: {
		event: string;
		data: unknown;
	}) => Promise<null | Socket<DefaultEventsMap, DefaultEventsMap>>;
};

type useSocketsState = {
	io: null | Socket;
	connecting: boolean;
	namespace: SocketNamespaces | null;
};

export type useSocketStore = useSocketsState & useSocketsStateActions;

export const SOCKET_NAMESPACES = {
	map: 'maps',
} as const;

type SOCKET_NAMESPACES_KEYS = keyof typeof SOCKET_NAMESPACES;

export type SocketNamespaces = typeof SOCKET_NAMESPACES[SOCKET_NAMESPACES_KEYS];

export const SOCKET_SERVICE_EVENTS = {
	on_connect: 'on-connect',
	connect: 'connect',
	disconnect: 'disconnect',
} as const;

type SOCKET_SERVICE_EVENTS_KEYS = keyof typeof SOCKET_SERVICE_EVENTS;
export type socketServiceEvents =
	typeof SOCKET_SERVICE_EVENTS[SOCKET_SERVICE_EVENTS_KEYS];

export type onConnectedResponseDTO = {
	result: boolean;
	anonId?: string;
};
