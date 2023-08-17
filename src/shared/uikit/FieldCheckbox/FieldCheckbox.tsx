/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import { Flex, Text } from '@chakra-ui/react';

type FieldCheckInterface = {
	label: string;
	name: string;
} & React.HTMLProps<HTMLInputElement>;

export function FieldCheckbox({ label, ...props }: FieldCheckInterface) {
	const [field, meta] = useField({ name: props.name, type: 'checkbox' });

	return (
		<label htmlFor={props.name} className="field-input">
			<Flex gap={4}>
				<Text fontSize="md" fontWeight={400}>
					{label}
				</Text>
				<input {...field} {...props} type="checkbox" />
			</Flex>
			{meta.touched && meta.error ? (
				<Text color="red.500">{meta.error}</Text>
			) : null}
		</label>
	);
}
