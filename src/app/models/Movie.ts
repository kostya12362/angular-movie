
export interface Pagination {
  count: number;
  next: any;
  previous: string;
  results:  Movie[];
}
export interface Movie {
  id: number;
  title: string;
  description: string;
  avg_rating: number;
  no_of_ratings: number;
}

