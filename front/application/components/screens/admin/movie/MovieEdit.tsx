import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import SkeletonLoader from '@/ui/SceletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import FieldForwardRef from '@/ui/form-elements/FieldForwardRef'
import stylesForm from '@/ui/form-elements/admin-form.module.sass'
import SlugField from '@/ui/form-elements/slug-field/SlugField'
import UploadField from '@/ui/form-elements/upload-field/UploadField'
import Heading from '@/ui/heading/Heading'
import VideoPlayer from '@/ui/video-player/VideoPlayer'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

import { IMovieEditInput } from './movies-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'

const DinamicSelect = dynamic(
	//если не загрузить компонент без ssr то при обновлении страницы будет ошибка обращения к объекту window (window is not defined)
	() => import('@/ui/select/Select'),
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

	const { isLoading: isLoadingActors, data: dataActors } = useAdminActors()
	const { isLoading: isLoadingGenres, data: dataGenres } = useAdminGenres()

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
							/>
							<div>
								<SlugField
									register={register}
									generate={() =>
										setValue('slug', generateSlug(getValues('title')))
									}
									error={errors.slug}
								/>
							</div>
							<Field
								register={register('parameters.country', {
									required: 'Country is required!',
								})}
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>
							<Field
								register={register('parameters.duration', {
									validate: (v) => {
										if (!Number(v)) return 'Duration must be a number'
										return true
									},
									required: 'Duration is required!',
								})}
								placeholder="Duration (min.)"
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>
							<FieldForwardRef
								{...register('parameters.year', {
									//принимает в себя name и options
									validate: (v) => {
										if (v.toString().length !== 4)
											return 'Year must contain 4 numbers'
										if (!Number(v)) return 'Year must be a number'
										return true
									},
									required: 'Year is required!',
								})}
								placeholder="Year"
								error={errors.parameters?.year}
								style={{ width: '31%' }}
							/>
							<Controller
								control={control}
								name="genres" //обращаемся к value с ключом genres
								render={({ field, fieldState: { error } }) => (
									<DinamicSelect
										field={field}
										options={dataGenres || []}
										isLoading={isLoadingGenres}
										isMulti
										placeholder="Genres"
										error={error}
									/>
								)}
								rules={{
									required: 'Please select at least one genre!',
								}}
							/>
							<Controller
								control={control}
								name="actors" //обращаемся к value с ключом actors
								render={({ field, fieldState: { error } }) => (
									<DinamicSelect
										field={field}
										options={dataActors || []}
										isLoading={isLoadingActors}
										isMulti
										placeholder="Actors"
										error={error}
									/>
								)}
								rules={{
									required: 'Please select at least one actor!',
								}}
							/>
							<Controller
								control={control}
								name="poster" //обращаемся к value с ключом poster
								defaultValue=""
								render={({
									field: { onChange, value }, //value берется из заранее определенных через setValue значений, onChange дает возможность менять value
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder="movies" //переменная которая пойдет в query параметр запроса на сервер
										placeholder="Poster"
									/>
								)}
								rules={{
									required: 'Poster is required!',
								}}
							/>
							<Controller
								control={control}
								name="bigPoster" //обращаемся к value с ключом bigPoster
								defaultValue=""
								render={({
									field: { onChange, value }, //value берется из заранее определенных через setValue значений, onChange дает возможность менять value
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder="movies" //переменная которая пойдет в query параметр запроса на сервер
										placeholder="Big poster"
									/>
								)}
								rules={{
									required: 'Big poster is required!',
								}}
							/>
							<Controller
								control={control}
								name="videoUrl" //обращаемся к value с ключом videoUrl
								defaultValue=""
								render={({
									field: { onChange, value }, //value берется из заранее определенных через setValue значений, onChange дает возможность менять value
									fieldState: { error },
								}) => (
									<>
										<UploadField
											onChange={onChange}
											value={value}
											error={error}
											folder="movies" //переменная которая пойдет в query параметр запроса на сервер
											placeholder="Video"
											style={{ marginTop: -25 }}
											multiple //выбор нескольких файлов
											isNoImage //отключаем блок вывода картинки
										/>
										<VideoPlayer
											slug={getValues('slug')}
											videoSource={value}
											inAdminPanel={true}
										/>
									</>
								)}
								rules={{
									required: 'Video is required!',
								}}
							/>
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default MovieEdit
