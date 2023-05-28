export interface IMovie {
    release_date: string
    poster_path: string
    original_title: string
    vote_average: number
    id: number
}
export interface IMovieDetail {
    original_title: string
    release_date: string
    id: number
    genres: [
        {
            name: string
            id: number
        }
    ]
    runtime: number
    overview: string
    poster_path: string
    backdrop_path: string
    vote_average: number
}
export interface IActor {
    profile_path: string
    id: number
    original_name: string
    character: string
}
export interface ITrailer {
    key: string
    id: number
}
export interface IActorDetail {
    name: string
    profile_path: string
    id: number
    biography: string
    birthday: string
}
export interface IActorMovie {
    original_title: string
    poster_path: string
    release_date: string
    vote_average: number
    id: number
}