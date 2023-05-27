import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import SkeletonLoader from '@/ui/SceletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import stylesForm from '@/ui/form-elements/admin-form.module.sass'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useUserEdit } from './useUserEdit'
import { IUserEditInput } from './user-edit.interface'

const UserEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		control,
	} = useForm<IUserEditInput>({
		mode: 'onChange',
	})
	const { onSubmit, isLoading } = useUserEdit(setValue)

	return (
		<Meta title="Edit user">
			<AdminNavigation />
			<Heading title="Edit user" />

			<form onSubmit={handleSubmit(onSubmit)} className="admin-form">
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={stylesForm.fields}>
							<Field
								register={register('email', {
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address',
									},
									required: 'Email is required!',
								})}
								placeholder="Email"
								error={errors.email}
							/>
							<Field
								register={register('password', {
									minLength: {
										value: 6,
										message: 'Password must be at least 6 characters long',
									},
									maxLength: {
										value: 20,
										message: 'Password must not exceed 20 characters',
									},
									pattern: {
										// value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
										value: /^[a-zA-Z\d]/,
										message:
											'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
									},
								})}
								placeholder="Password"
								error={errors.password}
							/>
							<Controller
								control={control}
								name="isAdmin"
								render={({ field }) => (
									<button
										className="text-link block mb-7"
										onClick={(e) => {
											e.preventDefault()
											field.onChange(!field.value)
										}}
									>
										{field.value ? 'Make it regular user' : 'Make it admin'}
									</button>
								)}
							/>
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default UserEdit
