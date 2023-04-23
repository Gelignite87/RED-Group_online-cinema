export const getMovieUrl = (slug: string) => `/movie/${slug}`
export const getGenreUrl = (slug: string) => `/genre/${slug}`
export const getActorUrl = (slug: string) => `/actor/${slug}`

export const getAdminUrl = (url: string) => `/manage/${url}` // /manage более безопасно чем /admin
export const getAdminHomeUrl = () => getAdminUrl('').slice(0, -1) //убираем последнюю букву
