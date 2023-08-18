export const MAP_EDIT_PERMISSIONS = {
	all: 0,
	creator: 1,
	logined: 2,
	creator_and_moderators: 3,
	allowed_users: 4,
} as const;

type MAP_EDIT_PERMISSIONS_KEYS = keyof typeof MAP_EDIT_PERMISSIONS;
export type mapsEditPermissions =
	typeof MAP_EDIT_PERMISSIONS[MAP_EDIT_PERMISSIONS_KEYS];

export type MapParticipantPermissions = {
	view: boolean | null;
	edit_actions: boolean | null;
	drop_actions: boolean | null;
	add_actions: boolean | null;
	ban_participants: boolean | null;
	invite_participants: boolean | null;
	modify_participants: boolean | null;
	set_permissions: boolean | null;
	change_map_description: boolean | null;
	change_map_properties: boolean | null;
};

type MapPermissionsStoreActions = {
	clear: () => void;
	set: (data: Partial<MapParticipantPermissions>) => void;
};

export type MapParticipantPermissionsStoreType = MapParticipantPermissions &
	MapPermissionsStoreActions;
