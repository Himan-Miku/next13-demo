import Image from "next/image";
import Link from "next/link";

const Movie = ({ movie }) => {
  const { id, title, poster_path, release_date } = movie;

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <h1> {title} </h1>
      <h3> {release_date} </h3>
      <Link href={`/${id}`}>
        <Image
          src={imagePath + poster_path}
          alt={title}
          height={400}
          width={400}
        />
      </Link>
    </div>
  );
};

export default Movie;
