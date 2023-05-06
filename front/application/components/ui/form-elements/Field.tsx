import cn from 'classnames'
import { FC } from 'react'

import { IField } from './form.interface'
import styles from './form.module.sass'

const Field: FC<IField> = ({
	placeholder,
	error,
	type = 'text',
	register,
	options,
	name,
}) => {
	return (
		<div className={cn(styles.common, styles.field)}>
			<label>
				<span>{placeholder}</span>
				<input {...register(name, options)} type={type} />
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
}

export default Field
