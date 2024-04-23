import {useState} from 'react';
import {email as emailRegex} from '../utils/regex';
import {subscribe} from 'klaviyo-subscribe';
import {useForm} from 'react-hook-form';

const OPTIONS = {
	clearFormAfterSubmit: true,
};

const useKlaviyo = (
	klaviyoListId,
	klaviyoSourceId = '',
	userOptions = OPTIONS,
) => {
	const options = {
		...OPTIONS,
		...userOptions,
	};

	const {
		register,
		handleSubmit,
		formState: {errors},
		setValue,
		trigger,
		getFieldState,
	} = useForm();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [networkError, setNetworkError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const onSubmit = async data => {
		setIsSubmitting(true);
		setNetworkError(null);
		setIsSuccess(false);

		try {
			if (data.phone) {
				await subscribe(klaviyoListId, data.email, {
					$fields: [
						'$source',
						'phone_number',
						'$consent',
						'sms_consent',
					],
					$source: klaviyoSourceId,
					phone_number: data.phone,
					$consent: ['sms'],
					sms_consent: true,
				});
			} else {
				await subscribe(klaviyoListId, data.email, {
					$fields: ['$source'],
					$source: klaviyoSourceId,
				});
			}

			setIsSuccess(true);
			setNetworkError(false);

			if (options.clearFormAfterSubmit) {
				setValue('email', '');
				setValue('phone', '');
			}
		} catch (error) {
			setNetworkError(error.msg);
		}

		setIsSubmitting(false);
	};

	const inputProps = {
		type: 'text',
		...register('email', {required: true, pattern: emailRegex}),
	};

	const phoneInputProps = {
		type: 'tel',
		...register('phone', {minLength: 6, maxLength: 12}),
	};

	const formProps = {
		onSubmit: handleSubmit(onSubmit),
	};

	return {
		formProps,
		inputProps,
		phoneInputProps,
		setValue,
		isSubmitting,
		isSuccess,
		networkError,
		errors,
		trigger,
		getFieldState,
	};
};

export default useKlaviyo;
