interface Book {
  id: string;
  name: string;
  rating: number;
  authors: Author[];
}

export interface Author {
  id: string;
  name: string;
  age: number;
}

export const books: Book[] = [
  {
    id: "1",
    name: "Harry potter",
    rating: 5,
    authors: [{ id: "1", name: "J.K Rowling", age: 58 }],
  },
  {
    id: "2",
    name: "Rust for Rustaceans",
    rating: 4,
    authors: [
      { id: "2", name: "Jon Gjengset", age: 34 },
      { id: "3", name: "The Primeagen", age: 40 },
    ],
  },
  {
    id: "3",
    name: "The Book",
    rating: 4,
    authors: [
      { id: "4", name: "Chukwuemeka Emmanuel", age: 10 },
      { id: "5", name: "Omolefe Victoria", age: 10 },
    ],
  },
  {
    id: "4",
    name: "Designing Data Intensive Applications",
    rating: 5,
    authors: [
      { id: "6", name: "Martin Kleppmann", age: 51 },
      { id: "7", name: "Jay Krepp", age: 39 },
      { id: "8", name: "Kevin Scott", age: 47 },
    ],
  },
  {
    id: "5",
    name: "Site Reliability Engineering",
    rating: 4,
    authors: [
      { id: "8", name: "Betsy Beyer", age: 36 },
      { id: "9", name: "Chris Jones", age: 41 },
      { id: "10", name: "Richard Murphy", age: 31 },
    ],
  },
];

function filterByRating(rating?: number): Book[] {
  if (!rating) return books;

  return books.filter((b) => b.rating === rating);
}

export default { filterByRating };
