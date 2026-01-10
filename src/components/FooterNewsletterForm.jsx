import React from 'react';
import cx from 'classnames';
import useKlaviyo from '../hooks/useKlaviyo';
import {AnimatePresence, m as motion} from 'framer-motion';
import ease from '../config/ease';
import BlockContent from '@sanity/block-content-to-react';
import richText from '../serializers/richText';

export default function FooterNewsletterForm({
	title,
	description = [],
	inputPlaceholder,
	successMessage,
	klaviyoListId,
	klaviyoSourceId,
}) {
	const {
		formProps,
		inputProps,
		isSubmitting,
		isSuccess,
		networkError,
		errors,
	} = useKlaviyo(klaviyoListId, klaviyoSourceId, {
		clearFormAfterSubmit: false,
	});

	let caption = '';

	if (isSuccess) {
		caption = '';
	} else if (errors.email) {
		caption = 'Please enter a valid email.';
	} else if (networkError) {
		caption = networkError;
	}

	const newsletterForm = (
		<form {...formProps}>
			<div className="flex justify-between border-b border-solid">
				<div className="flex-grow">
					<input
						{...inputProps}
						className={cx(
							'block w-full py-half text-sans-12-caps uppercase tracking-wider',
							{
								loading: isSubmitting,
							},
						)}
						placeholder={inputPlaceholder}
					/>
				</div>
				<button
					type="submit"
					disabled={isSubmitting}
					className={cx(
						'block py-half link-opacity-hover text-sans-12-caps uppercase tracking-wider',
						{
							loading: isSubmitting,
						},
					)}>
					Submit
				</button>
			</div>
		</form>
	);

	const successRow = <div className="tracking-wide">{successMessage}</div>;

	const captionRow = (
		<div className="min-h-[15px] mt-1">
			<AnimatePresence mode="wait">
				{caption && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{
							ease: ease.appear,
							duration: 400 / 1000,
						}}>
						<p className="uppercase tracking-wider text-terracotta">
							{caption}
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);

	const headerRow = (
		<div className="flex flex-col gap-1 mb-2 md:mb-4">
			{title && <h3>{title}</h3>}
			{Boolean(description && description.length) && (
				<div className="rich-text line-break tracking-wide xl:pr-8">
					<BlockContent blocks={description} serializers={richText} />
				</div>
			)}
		</div>
	);

	return (
		<div>
			{headerRow}

			<div className="min-h-[60px]">
				<AnimatePresence mode="wait">
					{!isSuccess && (
						<motion.div
							key="newsletter-form"
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							transition={{
								ease: ease.appear,
								duration: 400 / 1000,
							}}>
							{newsletterForm}
						</motion.div>
					)}
					{isSuccess && (
						<motion.div
							key="newsletter-success"
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							transition={{
								ease: ease.appear,
								duration: 400 / 1000,
							}}>
							{successRow}
						</motion.div>
					)}
				</AnimatePresence>
				{captionRow}
			</div>
		</div>
	);
}
