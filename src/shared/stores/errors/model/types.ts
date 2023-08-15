export interface OMEErrorType {
	id: string;
	type: 'default' | 'custom';
	msg?: string[];
	statusCode?: number;
	rawError: UnifiedError;
}

export interface WsError {
	event: string;
	data: {
		id: string;
		rid: string;
		statusCode: number;
		message: Array<string>;
		error: string;
	};
}

export type UnifiedError = WsError | Error | unknown;

export type ErrorStoreActions = {
	add: (err: UnifiedError | UnifiedError[]) => void;
	drop: (id: string) => void;
	clear: () => void;
};

export type ErrorStoreVariables = {
	errorsList: string[];
	errorsById: Record<string, OMEError>;
};

export type ErrorsStore = ErrorStoreActions & ErrorStoreVariables;

export class OMEError extends Error {
	id: string;

	type: 'default' | 'custom' | 'cancel';

	msg?: string[];

	statusCode?: number;

	rawError: UnifiedError;

	constructor(error: OMEErrorType) {
		super();
		this.id = error.id;
		this.type = error.type;
		this.msg = error.msg;
		this.message = error.msg?.toString() || '';
		this.name = error.msg?.toString() || '';
		this.statusCode = error.statusCode;
		this.rawError = error.rawError;
	}
}
