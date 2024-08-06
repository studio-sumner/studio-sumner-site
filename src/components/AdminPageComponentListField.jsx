import React, {useState, Fragment} from 'react';
import {
	Button,
	Dialog,
	Inline,
	Text,
	Badge,
	Stack,
	Box,
	Card,
} from '@sanity/ui';
import {AddIcon} from '@sanity/icons';
import {reduce} from 'lodash';
import {customAlphabet} from 'nanoid';

const nanoid = customAlphabet('0123456789abcdef', 12);

export function ComponentOption({title, variantTitle, thumbnailUrl, onSelect}) {
	return (
		<button
			style={{
				display: 'block',
				width: '100%',
				padding: 0,
				border: 'none',
			}}
			onClick={onSelect}>
			<Card padding={[3]} radius={2} shadow={1}>
				<Stack space={3}>
					<Card
						tone="transparent"
						shadow={1}
						radius={2}
						style={{
							aspectRatio: '2 / 1',
							position: 'relative',
							overflow: 'hidden',
						}}>
						{!thumbnailUrl && (
							<div
								style={{
									position: 'absolute',
									inset: '0',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<Text
									size={1}
									weight="medium"
									align="center"
									style={{opacity: 0.2}}>
									{title}
								</Text>
							</div>
						)}
						{thumbnailUrl && (
							<div
								style={{
									position: 'absolute',
									inset: '0',
								}}>
								<img
									src={thumbnailUrl}
									style={{
										objectFit: 'contain',
										width: '100%',
										height: '100%',
										position: 'absolute',
										inset: '0',
									}}
								/>
							</div>
						)}
					</Card>
					<Inline space={2} style={{textAlign: 'center'}}>
						<Text size={1} weight="medium" align="center">
							{title}
						</Text>
						{variantTitle && (
							<Badge paddingX={2}>{variantTitle}</Badge>
						)}
					</Inline>
				</Stack>
			</Card>
		</button>
	);
}

export default function AdminPageComponentListField(props) {
	const [isDialogOpen, setDialogOpen] = useState(false);

	const componentOptions = reduce(
		props.schemaType.of,
		(componentOptions, componentSchema) => {
			const initialValue =
				typeof componentSchema.initialValue === 'function'
					? componentSchema.initialValue()
					: componentSchema.initialValue;

			const noVariantOption = {
				name: componentSchema.name,
				title: componentSchema.title || componentSchema.name,
				variantTitle: null,
				thumbnailUrl: componentSchema.thumbnailUrl,
				initialValue,
			};

			let variantOptions = [];

			if (Array.isArray(componentSchema.variants)) {
				variantOptions = componentSchema.variants.map(variant => {
					const initialValue =
						typeof variant.initialValue === 'function'
							? variant.initialValue()
							: variant.initialValue;

					return {
						name: componentSchema.name,
						title: componentSchema.title || componentSchema.name,
						variantTitle: variant.title,
						thumbnailUrl: variant.thumbnailUrl
							? variant.thumbnailUrl
							: componentSchema.thumbnailUrl,
						initialValue,
					};
				});
			}

			return [...componentOptions, noVariantOption, ...variantOptions];
		},
		[],
	);

	const onAddComponent = componentSchema => {
		setDialogOpen(false);

		const newItem = {
			_key: nanoid(),
			_type: componentSchema.name,
			...(componentSchema.initialValue || {}),
		};

		props.onItemAppend(newItem);
		props.onItemOpen([...props.path, {_key: newItem._key}]);
	};

	const arrayInput = props.renderDefault({
		...props,
		arrayFunctions: () => null,
	});

	const arrayOpenDialogButton = (
		<Button
			text="Add component"
			icon={AddIcon}
			onClick={() => setDialogOpen(true)}
			mode="ghost"
		/>
	);

	const componentOptionCards = componentOptions.map((option, index) => (
		<ComponentOption
			key={index}
			{...option}
			onSelect={() => onAddComponent(option)}
		/>
	));

	const componentDialog = isDialogOpen && (
		<Dialog
			width={5}
			header="Add component"
			onClose={() => setDialogOpen(false)}
			zOffset={1000}>
			<Box padding={4}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '20px',
					}}>
					{componentOptionCards}
				</div>
			</Box>
		</Dialog>
	);

	return (
		<Fragment>
			<Stack space={3}>
				{arrayInput}
				{arrayOpenDialogButton}
			</Stack>
			{componentDialog}
		</Fragment>
	);
}
