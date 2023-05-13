import { FC } from 'react'

import Field from '@/ui/form-elements/Field'
import FieldForwardRef from '@/ui/form-elements/FieldForwardRef'

import { IAuthFields } from './auth.interface'

const AuthFields: FC<IAuthFields> = ({
	formState: { errors },
	register,
	isPasswordRequired = false,
}) => {
	return (
		<>
			<Field
				register={register('email', {
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						message: 'Invalid email address',
					},
					required: 'Email is required',
				})}
				placeholder="E-mail"
				error={errors.email} //определенное нами имя поля записывается как свойство ошибки
			/>
			<FieldForwardRef
				{...register(
					//принимает в себя name и options
					'password',
					isPasswordRequired
						? {
								minLength: {
									value: 6,
									message: 'Min length should be 6',
								},
								required: 'Password is required',
						  }
						: {}
				)}
				placeholder="Password"
				type="password"
				error={errors.password}
			/>
		</>
	)
}

export default AuthFields
