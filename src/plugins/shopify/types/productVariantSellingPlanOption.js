export default {
	name: 'productVariantSellingPlanOption',
	title: 'Product Variant Selling Plan Option',
	type: 'object',
	fields: [
		{
			name: 'priceAdjustments',
			title: 'Price Adjustments',
			type: 'array',
			of: [
				{
					name: 'priceAdjustment',
					title: 'Price Adjustment',
					type: 'object',
					fields: [
						{
							name: 'price',
							title: 'Price',
							type: 'price',
						},
						{
							name: 'compareAtPrice',
							title: 'Compare At Price',
							type: 'price',
						},
						{
							name: 'perDeliveryPrice',
							title: 'Per Delivery Price',
							type: 'price',
						},
					],
					preview: {
						select: {
							title: 'price.amount',
							subtitle: 'price.currencyCode',
						},
					},
				},
			],
		},
		{
			name: 'sellingPlan',
			title: 'Selling Plan',
			type: 'object',
			fields: [
				{
					name: 'id',
					title: 'ID',
					type: 'string',
				},
				{
					name: 'name',
					title: 'Name',
					type: 'string',
				},
				{
					name: 'description',
					title: 'Description',
					type: 'string',
				},
				{
					name: 'recurringDeliveries',
					title: 'Recurring Deliveries',
					type: 'boolean',
				},
				{
					name: 'options',
					title: 'Options',
					type: 'array',
					of: [
						{
							name: 'option',
							title: 'Option',
							type: 'object',
							fields: [
								{
									name: 'name',
									title: 'Name',
									type: 'string',
								},
								{
									name: 'value',
									title: 'Value',
									type: 'string',
								},
							],
						},
					],
				},
			],
		},
	],
	preview: {
		select: {
			title: 'sellingPlan.name',
		},
	},
};
