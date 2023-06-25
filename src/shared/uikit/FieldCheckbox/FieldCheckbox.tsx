/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import { Checkbox, Flex, CheckboxProps, Text } from '@chakra-ui/react';

type FieldCheckInterface = { label: string; name: string } & CheckboxProps;

export function FieldCheckbox({ label, ...props }: FieldCheckInterface) {
	const [field, meta] = useField(props.name);

	return (
		<label htmlFor={props.name} className="field-input">
			<Flex gap={4}>
				<Text fontSize="md" fontWeight={400}>
					{label}
				</Text>
				<Checkbox {...field} {...props} />
				{meta.touched && meta.error ? (
					<Text color="red.500">{meta.error}</Text>
				) : null}
			</Flex>
		</label>
	);
}
