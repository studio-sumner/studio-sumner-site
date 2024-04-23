import React, {useState} from 'react';

export default function PasswordScreen({
	password = '',
	completePasswordCheck = () => {},
}) {
	const [pendingPassword, setPendingPassword] = useState('');

	const onSubmitPasswordForm = event => {
		event.preventDefault();

		if (pendingPassword === password) {
			completePasswordCheck();
		}
	};

	return (
		<form
			onSubmit={onSubmitPasswordForm}
			className="flex flex-col h-[100vh] justify-center">
			<div className="flex items-stretch mx-auto max-w-[1000px] w-full p-2">
				<div className="flex-grow border border-solid">
					<input
						name="password"
						value={pendingPassword}
						onChange={event =>
							setPendingPassword(event.target.value)
						}
						className="w-full block p-2 bg-white h-full"
						placeholder="password"
					/>
				</div>
				<button
					type="submit"
					name="submit"
					className="flex-grow-0 block p-2 bg-black text-white h-full">
					submit
				</button>
			</div>
		</form>
	);
}
