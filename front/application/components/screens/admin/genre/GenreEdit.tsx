import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import SkeletonLoader from '@/ui/SceletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import FieldForwardRef from '@/ui/form-elements/FieldForwardRef'
import stylesForm from '@/ui/form-elements/admin-form.module.sass'
import SlugField from '@/ui/form-elements/slug-field/SlugField'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'
import { includesMaterialIcons } from '@/utils/object/includesMaterialIcons'
import { generateSlug } from '@/utils/string/generateSlug'

import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'

const DinamicTextEditor = dynamic(
	//если не загрузить компонент без ssr то при обновлении страницы будет ошибка обращения к объекту window (window is not defined)
	() => import('@/ui/form-elements/TextEditor'),
	{ ssr: false }
)

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})
	const { onSubmit, isLoading } = useGenreEdit(setValue)

	return (
		<Meta title="Edit genre">
			<AdminNavigation />
			<Heading title="Edit genre" />

			<form onSubmit={handleSubmit(onSubmit)} className={stylesForm.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={stylesForm.fields}>
							<Field
								register={register('name', { required: 'Name is required!' })}
								placeholder="Name"
								error={errors.name}
								style={{ width: '31%' }}
							/>
							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									generate={() =>
										setValue('slug', generateSlug(getValues('name')))
									}
									error={errors.slug}
								/>
							</div>
							<FieldForwardRef
								{...register('icon', {
									validate: (value) =>
										includesMaterialIcons(value) ||
										'Only icons from material icons library are allowed',
									required: 'Icon is required!',
								})} //принимает в себя name и options
								placeholder="Icon"
								error={errors.icon}
								style={{ width: '31%' }}
							/>
						</div>
						<Controller
							control={control}
							name="description"
							defaultValue=""
							render={({
								field: { onChange, value }, //value берется из заранее определенных через setValue значений, onChange дает возможность менять value
								fieldState: { error },
							}) => ( <p>04.11.2024</p>
								// <DinamicTextEditor
								// 	onChange={onChange}
								// 	value={value}
								// 	error={error}
								// 	placeholder="Description"
								// />
							)}
							rules={{
								validate: {
									required: (v) =>
										(v && stripHtml(v).result.length > 0) || //очищаем строку от html
										'Description is required!',
								},
							}}
						/>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default GenreEdit
