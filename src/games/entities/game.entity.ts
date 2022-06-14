
import { Genders } from "src/genders/entities/genders.entity"
import { Profile } from "src/profile/entities/profile.entity"


export class Game {
  id?: string
  title: string

  coverImageUrl: string
  description: string
  year: number
  imdScore: number
  trailerYoutubeUrl: string
  gamePlayYoutubeUrl: string


  profile?: Profile
  gender?: Genders[];


  createdAt?: Date
  updatedAt?: Date
}
