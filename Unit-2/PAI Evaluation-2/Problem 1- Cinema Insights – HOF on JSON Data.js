// Question

// Problem 1: Cinema Insights – HOF on JSON Data
// Objective
// Analyze a list of movies using higher-order functions.

// Dataset

// const movies = [
//   { title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, duration: 148 },
//   { title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, duration: 152 },
//   { title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, duration: 169 },
//   { title: "Tenet", year: 2020, genre: "Sci-Fi", rating: 7.4, duration: 150 },
//   { title: "Dunkirk", year: 2017, genre: "War", rating: 7.9, duration: 106 },
//   { title: "The Prestige", year: 2006, genre: "Drama", rating: 8.5, duration: 130 },
// ];

// Tasks
// Get a list of movie titles sorted by rating (descending).
// Filter movies by genre "Sci-Fi".
// Map movies to strings like "Interstellar (2014) - 169 mins".
// Calculate the average movie duration.
// Find the highest rated movie title.
// Use only HOFs (map, filter, reduce, sort). No loops.




const movies = [
  { title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, duration: 148 },
  { title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, duration: 152 },
  { title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, duration: 169 },
  { title: "Tenet", year: 2020, genre: "Sci-Fi", rating: 7.4, duration: 150 },
  { title: "Dunkirk", year: 2017, genre: "War", rating: 7.9, duration: 106 },
  { title: "The Prestige", year: 2006, genre: "Drama", rating: 8.5, duration: 130 },
];

let list=movies.sort((a,b)=>b.rating-a.rating).map(movie => movie.title)
console.log(list)

let genre= movies.filter(movie=> movie.genre=="Sci-Fi")
console.log(genre)

let strings=movies.map(movie=>{
  return `${movie.title} (${movie.year}) - ${movie.duration} mins`
})
console.log(strings)


let avg=movies.reduce((sum,movie)=>sum + movie.duration,0)/movies.length
console.log(avg)

let hrmovie=movies[0].title
console.log(hrmovie)