import { MediaSeason } from "@/lib/graphql/generated/graphql-types";

export function getMonth() {
  return new Date(Date.now()).getMonth();
}

export function convertSeasonToMediaSeason(season: string) {
  switch (season.toUpperCase()) {
    case "SPRING":
      return MediaSeason.Spring;
    case "SUMMER":
      return MediaSeason.Summer;
    case "FALL":
      return MediaSeason.Fall;
    case "WINTER":
      return MediaSeason.Winter;
  }
  throw Error("Invalid season");
}
