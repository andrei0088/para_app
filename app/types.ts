// app/types.ts

import { RegionMinimal } from "./filter/page";

export interface Country {
  id: number;
  name: string;
  description?: string; // null -> undefined
  latitude?: number;
  longitude?: number;
}
export interface CountryShort {
  id: number;
  name: string;
}

export interface Region {
  id: number;
  name: string;
  countryId: number;
  bestSeason?: number[];
  description?: string;
  map?: string | null;
  seo?: string | null;
  takeoffs?: Takeoff[];
  landings?: Landing[];
}

export interface RegionShort {
  id: number;
  name: string;
  countryId: number;
}

export interface Takeoff {
  id: number;
  name: string;
  regionId: number;
  latitude: number;
  longitude: number;
  map?: string | null;
  seo?: string | null;
  altitude?: number;
}

export interface Landing {
  id: number;
  name: string;
  regionId: number;
  latitude: number;
  longitude: number;
  map?: string | null;
  seo?: string | null;
  altitude?: number;
}

export interface Site {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  countryId: number;
  regionId?: number;
  map?: string | null;
  seo?: string | null;
  altitude: number;
  type: "takeoff" | "landing";
}

export interface BasePlace {
  id: number;
  name: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  countryId?: number;
  regionId?: number;
  bestSeason?: number[];
  altitude?: number;
  map?: string | null;
}

export type PlaceType = "country" | "region" | "takeoff" | "landing";

export interface Sites {
  takeoff: Takeoff[] | Site[];
  landing: Landing[] | Site[];
}

export interface Select {
  country: Country;
  region?: RegionMinimal[];
  season?: number | "";
  month?: number | "";
}

export type CommentUser = {
  id: string;
  name: string;
  profileId: number;
};

export type CommentItem = {
  id: number;
  comment: string;
  raport: number;
  profileId: number;

  createdAt: Date;
  userId: string;
  user: CommentUser;
};

export type Comment = {
  id: number;
  userId: string;
  comment: string;
  profileId: number;
  raport: number;
  createdAt: Date;
  deletedAt: Date | null;
  user: {
    id: string;
    name: string;
  };
};

export interface SignUpResult {
  success?: boolean;
  text?: string;
  email?: string;
  user?: Record<string, unknown>;
}

export interface SelectedLocation {
  id: number | null;
  lat: number | null;
  lng: number | null;
}

export interface LandingTakeoff {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  altitude: number;
  description?: string;
  map?: string;
  regionId: number;
  countryId: number;
}
