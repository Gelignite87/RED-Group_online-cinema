import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/components/ui/form-elements/Field'

import { IAuthInput } from './auth.interface'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<IAuthInput>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({
	formState: { errors },
	register,
	isPasswordRequired = false,
}) => {
	return (
		<>
			<Field
				{...register('email', {
					//здесь мы сами определяем имя поля
					required: 'Email is required',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						message: 'Invalid email address',
					},
				})}
				placeholder="E-mail"
				error={errors.email} //определенное нами имя поля записывается как свойство ошибки
			/>
			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Min length should be 6',
								},
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
