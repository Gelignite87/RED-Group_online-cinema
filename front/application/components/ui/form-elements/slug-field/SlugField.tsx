import { FC } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

import Field from '../Field'

import styles from './SlugField.module.sass'

interface ISlugField {
	register: UseFormRegister<any>
	generate: () => void
	error?: FieldError
}
const SlugField: FC<ISlugField> = ({ register, generate, error }) => {
	return (
		<div className="relative">
			<Field
				register={register('slug', { required: 'Slug is required!' })}
				placeholder="Slug"
				error={error}
			/>
			<div className={styles.badge} onClick={generate}>
				generate
			</div>
		</div>
	)
}

export default SlugField
