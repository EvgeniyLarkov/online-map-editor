import { IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react';

export function MapSettingsIconButton({
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
		<Tooltip
			hasArrow
			label={message}
			bg="gray.300"
			color="black"
			placement="right"
		>
			<IconButton
				aria-label={message}
				icon={icon}
				size="lg"
				colorScheme={selected ? 'blue' : 'teal'}
				onClick={onClick}
			/>
		</Tooltip>
	);
}
