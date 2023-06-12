import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';

type useSocketsStateActions = {
	handleConnect: (getToken: () => string) => Promise<void>;
	handleDisconnect: () => void;
	isConnected: () => boolean;
	emit: (options: {
		event: string;
		data: unknown;
	}) => Promise<null | Socket<DefaultEventsMap, DefaultEventsMap>>;
};

type useSocketsState = {
	io: null | Socket;
	connecting: boolean;
};

export type useSocketStore = useSocketsState & useSocketsStateActions;
