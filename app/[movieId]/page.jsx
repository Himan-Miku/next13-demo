import Image from "next/image";

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();

  return res.results.map((movie) => ({
    movieId: toString(movie.id),
  }));
}

const fetchMovie = async (movieId) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
    /*  For ISR :- , { next: { revalidate: 60 } }
        For SSG :- , { cache: "force-cache" }
        For SSR :- , { cache: "no-cache" }
    */
  );
  const res = await data.json();
  return res;
};

const MovieDetail = async ({ params: { movieId } }) => {
  const data = await fetchMovie(movieId);

  const imagePath = "https://image.tmdb.org/t/p/original";

  const { title, release_date, runtime, overview, status, backdrop_path } =
    data;

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold text-white"> {title} </h1>
        <h3 className="text-xl font-normal text-gray-600"> {release_date} </h3>
        <h3 className="text-lg font-normal text-gray-600">
          Runtime : {runtime}
        </h3>
        <h2 className="inline-block rounded-md bg-green-500 py-2 px-4 text-sm">
          {status}
        </h2>
        <Image
          className="rounded-md object-cover"
          src={imagePath + backdrop_path}
          height={1000}
          width={1000}
          alt={title}
          priority
        />
        <div className="w-[1000px]">
          <p className=" text-sm font-semibold text-gray-600">{overview}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
