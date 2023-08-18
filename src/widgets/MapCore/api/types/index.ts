export const MAP_EVENTS = {
	new_action: 'new_action',
	join_map: 'join_map',
	participant_join: 'participant_join',
	participant_leave: 'participant_leave',
	leave_map: 'leave_map',
	get_actions: 'get_map_actions',
	drop_action: 'drop_action',
	change_action: 'change_action',
} as const;

type MAP_EVENTS_KEYS = keyof typeof MAP_EVENTS;
export type mapsActionNames = typeof MAP_EVENTS[MAP_EVENTS_KEYS];
