export type WithNull<T> = {
	[P in keyof T]: T[P] | null;
};

export interface IPaginationOptions {
	page: number;
	limit: number;
}

export type EndpointParameters = {
	limit?: number;
	page?: number;
	hash?: string;
};
