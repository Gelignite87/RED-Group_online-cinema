import cn from 'classnames'
import { FC } from 'react'

import { IField } from './form.interface'
import styles from './form.module.sass'

const Field: FC<IField> = ({
	placeholder,
	register,
	error,
	type = 'text',
	style,
}) => {
	return (
		<div className={cn(styles.common, styles.field)} style={style}>
			<label>
				<span>{placeholder}</span>
				<input {...register} type={type} />
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
}

export default Field
