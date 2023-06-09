export interface IMovie {
    profile_path: string
    id: number
    original_name: string
    character: string
    original_title: string
    poster_path: string
    release_date: string
    vote_average: number
    key: string
    genres: [
        {
            name: string
            id: number
        }
    ]
    runtime: number
    overview: string
    backdrop_path: string
    name: string
    biography: string
    birthday: string
}