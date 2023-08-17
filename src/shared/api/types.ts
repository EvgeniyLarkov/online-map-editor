import { AxiosError } from 'axios';

export type EndpointParameters = {
	limit?: number;
	offset?: number;
	hash?: string;
};

export type EndpointObject = {
	url: (data: undefined | EndpointParameters) => string;
	method: string;
};

export type RequestAdditionalOptions = {
	abortController?: AbortController;
};

export type RequestData<T> = {
	data?: T;
};

export type RequestOptions<T> = RequestData<T> & EndpointParameters;

interface IErrorBase<T> {
	error: Error | AxiosError<T>;
	type: 'axios-error' | 'stock-error' | 'server-error';
}

export enum IErrorTypes {
	'request' = 'axios-error',
	'response' = 'server-error',
	'internal' = 'stock-error',
}

export interface IAxiosError<T> extends IErrorBase<T> {
	error: AxiosError<T>;
	type: IErrorTypes.request;
}

export interface IServerError<T> extends IErrorBase<T> {
	error: AxiosError<T>;
	type: IErrorTypes.response;
}

export interface IStockError<T> extends IErrorBase<T> {
	error: Error;
	type: IErrorTypes.internal;
}

export type UnsuccssesRequest = {
	error: IErrorTypes;
	message: string;
	data?: {
		errors?: Record<string, string>;
		status: number;
	};
};

export type ResponseWithPagination<T> = {
	data: T;
	hasNextPage: boolean;
};
