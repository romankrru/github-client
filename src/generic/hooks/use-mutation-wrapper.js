// @flow
import {useState} from 'react';
import {useMutation} from 'react-apollo-hooks';

const useMutationWrapper = (
	mutation: any,
	{
		onSuccess,
		onError,
		...options
	}: {onSuccess?: mixed => void, onError?: Error => void} = {},
) => {
	const [loading, setLoading] = useState(false);
	const [called, setCalled] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const mutate = useMutation(mutation, options);

	const handler = (...args?: any) => {
		setLoading(true);
		setCalled(true);
		setError(null);
		setData(null);

		return mutate(...args)
			.then(({data}) => {
				setData(data);

				if (onSuccess) onSuccess(data);
			})

			.catch(err => {
				console.error(err);
				setError(err);

				if (onError) onError(err);
			});
	};

	return [
		handler,

		{
			loading,
			called,
			error,
			data,
		},
	];
};

export default useMutationWrapper;
