import Movie from "./Movie";

const fetchPopularMovies = async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  return res;
};

export default async function Home() {
  const data = await fetchPopularMovies();

  return (
    <main className="grid grid-cols-fluid gap-16">
      {data?.results.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </main>
  );
}
