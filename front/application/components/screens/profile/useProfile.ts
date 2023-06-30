import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

import { IProfileInput } from './profile.interface'

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { isLoading } = useQuery('profile', () => UserService.getProfile(), {
		onSuccess({ data }) {
			setValue('email', data.email)
		},
		onError(err) {
			toastrError(err, 'Get profile')
		},
	})

	const { mutateAsync: mutateMovie } = useMutation(
		'update profile',
		(data: IProfileInput) => UserService.updateProfile(data),
		{
			onError(err) {
				toastrError(err, 'Update profile')
			},
			onSuccess() {
				toastr.success('Update profile', 'profile successfully updated')
			},
		}
	)

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateMovie(data)
	}

	return { onSubmit, isLoading }
}
