export interface InfoResponse{
  content: [],
  pageable: {
    sort: {
      sorted: true,
      unsorted: true,
      empty: true
    },
    pageNumber: 0,
    pageSize: 5,
    opffset: 0,
    paged: true,
    unpaged: false
  },
  totalPages: 204,
  totalElements: 1016,
  last: false,
  numberOfElements: 5
  sort: {
    sorted: true,
    unsorted: false,
    empty: false
  },
  first: true,
  size: 5,
  number: 0,
  empty: false
}

export interface InfoTable{
  id: number,
  nombre: string,
  estadio: string,
  sitioWeb?: string,
  nacionalidad: string,
  fundacion: string,
  entrenador: string,
  capacidad: number,
  valor?: number
}
