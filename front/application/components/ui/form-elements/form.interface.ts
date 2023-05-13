import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {} //расширяемся от дефолтного интерфейса

export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}
type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IFieldForwardRef extends TypeInputPropsField {}

export interface IField {
	placeholder: string
	register: UseFormRegisterReturn<any>
	error?: FieldError | undefined
	type?: string
	style?: { [key: string]: string }
}
