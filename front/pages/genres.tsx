import { GetStaticProps } from 'next'
import { FC } from 'react'

import Collections from '@/screens/collections/Collections'
import { ICollection } from '@/screens/collections/collections.interface'

import { GenreServiceBuild } from '@/services/genre.service'

const GenresPage: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return <Collections collections={collections || []} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await GenreServiceBuild.getCollections()
		return { props: { collections: collections }, revalidate: 60 }
	} catch (e) {
		return { notFound: true }
	}
}

export default GenresPage
