import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {} //расширяемся от дефолтного интерфейса

export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}
type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IFieldForwardRef extends TypeInputPropsField {}

export interface IField {
	placeholder: string
	error?: FieldError | undefined
	type?: string
	register: UseFormRegister<any>
	options: {}
	style?: {}
	name: string
}
