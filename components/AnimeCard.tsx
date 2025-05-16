import Image from "next/image";

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="h-73 border-2">
      <div className="h-65 w-full overflow-hidden bg-black from-0% to-100%">
        <Image
          src={anime.image}
          alt={anime.title + " cover image"}
          width={500}
          height={500}
        ></Image>
      </div>
      <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
        {anime.title}
      </div>
    </div>
  );
}
