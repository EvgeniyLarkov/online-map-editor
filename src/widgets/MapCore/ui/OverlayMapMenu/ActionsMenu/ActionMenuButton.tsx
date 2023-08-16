import { IconButton } from '@chakra-ui/react';
import React from 'react';

export function ActionsMenuIcon({
	selected,
	onClick,
	message,
	icon,
}: {
	selected: boolean;
	message: string;
	onClick: (data: any) => void;
	icon: React.ReactElement;
}) {
	return (
		<IconButton
			aria-label={message}
			icon={icon}
			size="lg"
			colorScheme={selected ? 'blue' : 'teal'}
			onClick={onClick}
		/>
	);
}
