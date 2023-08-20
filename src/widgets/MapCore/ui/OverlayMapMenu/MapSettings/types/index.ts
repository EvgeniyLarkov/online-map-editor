export const MAP_SETTINGS_MENU_CATEGORIES = {
	default: 'default',
	map: 'map',
	participants: 'participants',
} as const;

type MAP_SETTINGS_MENU_CATEGORIES_KEYS =
	keyof typeof MAP_SETTINGS_MENU_CATEGORIES;
export type mapSettingsMenuCategoriesTypes =
	typeof MAP_SETTINGS_MENU_CATEGORIES[MAP_SETTINGS_MENU_CATEGORIES_KEYS];

type MapSettingsMenuCategoriesVariables = {
	opened: boolean;
	category: mapSettingsMenuCategoriesTypes;
};

type MapSettingsMenuCategoriesActions = {
	close: () => void;
	open: (category?: mapSettingsMenuCategoriesTypes) => void;
};

export type MapSettingsMenuCategoriesStore =
	MapSettingsMenuCategoriesVariables & MapSettingsMenuCategoriesActions;
