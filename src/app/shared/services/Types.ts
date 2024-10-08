export type Book = {
  authors:[
    {
      key: string,
      name: string
    }
  ],
  key: string,
  cover_id: number,
  first_publish_year: number,
  title: string,
  edition_count: number,
  isFav?:boolean
}

export type Author = {
  key: string,
  name: string,
  birth_date: string,
  revision: number,
  alternate_names: string[]
}