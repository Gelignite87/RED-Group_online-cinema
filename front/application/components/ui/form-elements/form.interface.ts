import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {} //расширяемся от дефолтного интерфейса

export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}
type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsField {}
