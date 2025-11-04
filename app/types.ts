// app/types.ts

export interface Country {
  id: number;
  name: string;
  description?: string; // null -> undefined
<<<<<<< HEAD
  latitude?: number;
  longitude?: number;
=======
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
}

export interface Region {
  id: number;
  name: string;
  countryId: number;
  bestSeason?: number[];
  description?: string;
  takeoffs?: Takeoff[];
  landings?: Landing[];
}

export interface Takeoff {
  id: number;
  name: string;
  regionId: number;
  latitude: number;
  longitude: number;
}

export interface Landing {
  id: number;
  name: string;
  regionId: number;
  latitude: number;
  longitude: number;
}

export interface Site {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  countryId: number;
  regionId?: number;
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
  map?: string;
}

export type PlaceType = "country" | "region" | "takeoff" | "landing";

export interface Sites {
  takeoff: Takeoff[] | Site[];
  landing: Landing[] | Site[];
}

export interface Select {
  country: Country;
  region?: Region[];
}

export type CommentUser = {
  id: string;
  name: string;
};

export type CommentItem = {
  id: number;
  comment: string;
<<<<<<< HEAD
    raport: number;

=======
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  createdAt: Date;
  userId: string;
  user: CommentUser;
};
<<<<<<< HEAD

export type Comment = {
  id: number;
  userId: string;
  comment: string;
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
=======
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
