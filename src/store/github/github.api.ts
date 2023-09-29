import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRepo, IUser, ServerResponse } from "../../models/models";

export const githubApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search) => ({
        url: "search/users",
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (respone: ServerResponse<IUser>) => respone.items,
    }),

    getUserRepos: build.query<IRepo[] | undefined, string>({
      query: (username) => ({
        url: `users/${username}/repos`,
      }),
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
