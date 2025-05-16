import Image from "next/image";

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="h-73 border-2">
      <div className="relative h-65 w-full overflow-hidden">
        <Image
          src={anime.image}
          alt={anime.title + " cover image"}
          width={500}
          height={500}
        />
        {/* <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-white"></div> */}
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_bottom,transparent_85%,white_100%)]"></div>
      </div>
      <div className="w-full overflow-hidden pr-1 pl-1 text-ellipsis whitespace-nowrap">
        {anime.title}
      </div>
    </div>
  );
}
