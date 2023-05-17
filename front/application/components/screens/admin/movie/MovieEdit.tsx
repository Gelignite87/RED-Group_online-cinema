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

import { IMovieEditInput } from './movies-edit.interface'
import { useMovieEdit } from './useMovieEdit'

const DinamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{ ssr: false }
)

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})
	const { onSubmit, isLoading } = useMovieEdit(setValue)

	return (
		<Meta title="Edit movie">
			<AdminNavigation />
			<Heading title="Edit movie" />

			<form onSubmit={handleSubmit(onSubmit)} className={stylesForm.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={stylesForm.fields}>
							<Field
								register={register('title', { required: 'Title is required!' })}
								placeholder="Title"
								error={errors.title}
								style={{ width: '31%' }}
							/>
							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									generate={() =>
										setValue('slug', generateSlug(getValues('title')))
									}
									error={errors.slug}
								/>
							</div>
							<FieldForwardRef
								{...register('parameters.country', {
									// validate: (value) => false || 'not validate',
									required: 'Country is required!',
								})} //принимает в себя name и options
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>
						</div>
						{/* <Controller
							control={control}
							name="videoUrl"
							defaultValue=""
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<DinamicTextEditor
									onChange={onChange}
									value={value}
									error={error}
									placeholder="VideoUrl"
								/>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v && stripHtml(v).result.length > 0) ||
										'VideoUrl is required!',
								},
							}}
						/> */}
						<p>year: {getValues('parameters')?.year}</p>
						<p>duration: {getValues('parameters')?.duration} min</p>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default MovieEdit
