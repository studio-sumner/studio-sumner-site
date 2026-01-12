import React from 'react';
import cx from 'classnames';
import useKlaviyo from '../hooks/useKlaviyo';
import {AnimatePresence, m as motion} from 'framer-motion';
import ease from '../config/ease';
import BlockContent from '@sanity/block-content-to-react';
import richText from '../serializers/richText';

const FooterNewsletterForm = ({
	title = 'Newsletter',
	inputPlaceholder = 'Email',
	successMessage = 'Thanks!',
	klaviyoListId,
	klaviyoSourceId,
}) => {
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
				<div className="grow">
					<input
						{...inputProps}
						className={cx('block w-full py-half', {
							loading: isSubmitting,
						})}
						placeholder={inputPlaceholder}
					/>
				</div>
				<button
					type="submit"
					disabled={isSubmitting}
					className={cx('block py-half link-opacity-hover', {
						loading: isSubmitting,
					})}>
					Submit
				</button>
			</div>
		</form>
	);

	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-12/12 uppercase tracking-wide font-500">
				{title}
			</h3>

			<div className="min-h-3">
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
							<p>{successMessage}</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{caption && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					transition={{
						ease: ease.appear,
						duration: 400 / 1000,
					}}>
					<p>{caption}</p>
				</motion.div>
			)}
		</div>
	);
};

export default FooterNewsletterForm;
