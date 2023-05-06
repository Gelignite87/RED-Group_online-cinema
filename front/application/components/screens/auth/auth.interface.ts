import { FormState, UseFormRegister } from 'react-hook-form'

export interface IAuthInput {
	email: string
	password: string
}

export interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<IAuthInput> //у FormState есть свойство errors, добавляем к нему наши свойства (получаем errors.email и errors.password)
	isPasswordRequired?: boolean
}
