import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { getAdminUrl } from '@/config/url.config'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

import { IUserEditInput } from './user-edit.interface'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { push, query } = useRouter()

	const userId = String(query.id) //оборачиваем в String на случай если придёт undefined

	const { isLoading } = useQuery(
		['user', userId],
		() => UserService.getById(userId),
		{
			onSuccess({ data }) {
				setValue('email', data.email)
				setValue('isAdmin', data.isAdmin)
			},
			onError(err) {
				toastrError(err, 'Get user')
			},
			enabled: !!query.id, //срабатывает только если есть query.id
		}
	)

	const { mutateAsync: mutateUser } = useMutation(
		'update user',
		(data: IUserEditInput) => UserService.update(userId, data),
		{
			onError(err) {
				toastrError(err, 'Update user')
			},
			onSuccess() {
				toastr.success('Update user', 'user successfully updated')
				push(getAdminUrl('users'))
			},
		}
	)

	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateUser(data)
	}

	return { onSubmit, isLoading }
}
