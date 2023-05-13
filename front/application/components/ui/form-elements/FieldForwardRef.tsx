import cn from 'classnames'
import { forwardRef } from 'react'

import { IFieldForwardRef } from './form.interface'
import styles from './form.module.sass'

const FieldForwardRef = forwardRef<HTMLInputElement, IFieldForwardRef>(
	({ placeholder, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={cn(styles.common, styles.field)} style={style}>
				<label>
					<span>{placeholder}</span>
					<input ref={ref} type={type} {...rest} />
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

FieldForwardRef.displayName = 'FieldForwardRef' //открываем компонент FieldForwardRef

export default FieldForwardRef
