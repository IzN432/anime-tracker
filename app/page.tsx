"use client";

import AnimeCard from "@/components/AnimeCard";
import {
  MediaSeason,
  useFetchAnimeListForSeasonQuery,
} from "@/lib/graphql/generated/graphql-types";
import { convertSeasonToMediaSeason } from "@/utils/Date";
import { useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSeason, setCurrentSeason] = useState("Spring");
  const [currentYear, setCurrentYear] = useState("2025");
  const [isFetching, setIsFetching] = useState(false);

  const [queryVariables, setQueryVariables] = useState({
    page: 1,
    perPage: 12,
    season: MediaSeason.Spring,
    seasonYear: 2025,
  });
  const { loading, error, data, fetchMore } = useFetchAnimeListForSeasonQuery({
    variables: queryVariables,
  });

  function fetchMoreData() {
    const nextPage = currentPage + 1;
    setIsFetching(true);
    setCurrentPage(nextPage);
    fetchMore({
      variables: {
        page: nextPage,
      },
    }).finally(() => setIsFetching(false));
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const animes: Anime[] =
    data?.Page?.media?.map((media) => ({
      id: media!.id!,
      title: media!.title!.userPreferred!,
      image: media!.coverImage!.large!,
    })) || [];

  const hasNextPage = data?.Page?.pageInfo?.hasNextPage;

  return (
    <div className="mt-4 mb-4 flex flex-col gap-5">
      <h1 className="mr-auto ml-auto w-fit text-6xl font-bold">This season</h1>
      <div className="mr-auto ml-auto flex flex-row gap-5">
        <input
          type="text"
          placeholder="Season"
          className="rounded-2xl border-2 border-gray-200 p-1 text-center"
          name="season"
          onChange={(event) => {
            setCurrentSeason(convertSeasonToMediaSeason(event.target.value));
          }}
        />
        <input
          type="text"
          placeholder="Year"
          className="rounded-2xl border-2 border-gray-200 p-1 text-center"
          name="year"
          onChange={(event) => {
            setCurrentYear(event.target.value);
          }}
        />
        <button
          className="rounded-2xl border-2 p-5 hover:bg-gray-100 active:bg-gray-200"
          onClick={() => {
            setQueryVariables({
              page: 1,
              perPage: 10,
              season: convertSeasonToMediaSeason(currentSeason),
              seasonYear: Number(currentYear),
            });
            setCurrentPage(1);
          }}
        >
          Update
        </button>
      </div>
      <div className="mr-auto ml-auto max-w-200">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {animes.map((anime) => (
              <AnimeCard anime={anime} key={anime.title} />
            ))}
          </div>
        )}
      </div>
      {hasNextPage && (
        <button
          className="mr-auto ml-auto w-fit rounded-lg border-2 text-2xl hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200"
          onClick={fetchMoreData}
          disabled={loading}
        >
          {isFetching ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
