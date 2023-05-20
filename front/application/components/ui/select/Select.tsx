import { FC } from 'react'
import ReactSelect, { OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated'

import styles from './Select.module.sass'
import { IOption, ISelect } from './select.interface'

const Select: FC<ISelect> = ({
	placeholder,
	error,
	isMulti = false,
	options,
	field,
	isLoading,
}) => {
	const onChangeSelect = (newValue: OnChangeValue<IOption, boolean>) => {
		//преобразуем [{label, value}, {label, value}, ...] в [value, value, ...]
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((el) => el.value)
				: [(newValue as IOption).value]
		)
	}
	const getValue = () => {
		//ищем нужные элементы массива options
		if (field.value) {
			//при загрузке страницы field.value = undefined поэтому делаем проверку
			return isMulti
				? options.filter((option) => field.value.includes(option.value))
				: options.find((option) => field.value[0] === option.value)
		} else {
			return isMulti ? [] : null
		}
	}
	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
					classNamePrefix="custom-select" //глобальный стиль, лежит в папке assets/styles
					options={options} //получаем массив всех имеющихся объектов [{label, value}, {label, value}, ...]
					isMulti={isMulti} //в зависимости от isMulti onChangeSelect принимает массив или объект, value работает с массивом или объектом, options всегда массив
					onChange={onChangeSelect} //onChangeSelect принимает текущий набор value и передает его в field.onChange(), чтобы была реактивность и чтобы отправить данные на сервер
					value={getValue()} //возвращает массив options или объект из options у которых value равен field.value
					isLoading={isLoading}
					components={makeAnimated()}
				/>
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
}

export default Select
