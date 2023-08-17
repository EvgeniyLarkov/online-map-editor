import React from 'react';
import { useField } from 'formik';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';

type FieldStackInterface = {
	label: string;
	values: Array<[string, string]>;
	name: string;
} & React.HTMLProps<HTMLInputElement>;

export function FieldRadioStack({
	label,
	values,
	...props
}: FieldStackInterface) {
	const [field, meta] = useField({ name: props.name, type: 'radio' });

	return (
		<Box>
			<Text fontSize="lg" fontWeight={500}>
				{label}
			</Text>
			<Stack marginTop={4}>
				{values.map(([value, fieldName]) => {
					return (
						<Flex gap={4} key={`${props.name}-${value}`} align="center">
							<input
								{...props}
								value={value}
								checked={meta.value.toString() === value}
								type="radio"
								onBlur={field.onBlur}
								onChange={field.onChange}
							/>
							<Text fontSize="md" fontWeight={400}>
								{fieldName}
							</Text>
						</Flex>
					);
				})}
			</Stack>
			{meta.touched && meta.error ? (
				<Text color="red.500">{meta.error}</Text>
			) : null}
		</Box>
	);
}
