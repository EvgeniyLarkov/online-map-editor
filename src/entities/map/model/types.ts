import { WithNull } from 'shared/types';
import { UserDto } from 'shared/types/user';

export type OMEMap = {
	id: number;
	hash: string;
	name: string;
	description: string;
	public: boolean;
	creator: UserDto;
	createdAt: string;
	updatedAt: string;
};

export type MapStoreActions = {
	update: (data: Partial<OMEMap>) => void;
};

export type MapStoreType = MapStoreActions & WithNull<OMEMap>;
