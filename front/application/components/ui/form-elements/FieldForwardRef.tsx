import cn from 'classnames'
import { forwardRef } from 'react'

import { IField } from './form.interface'
import styles from './form.module.sass'

const FieldForwardRef = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', ...rest }, ref) => {
		return (
			<div className={cn(styles.common, styles.field)}>
				<label>
					<span>{placeholder}</span>
					<input ref={ref} type={type} {...rest} />
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

FieldForwardRef.displayName = 'FieldForwardRef'

export default FieldForwardRef
