import { FC, useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";
import RepoCard from "../components/RepoCard";
import DropDown from "../components/DropDown";

const HomePage: FC = () => {
  const [search, setSearch] = useState("");
  const [dropDown, setDropDown] = useState(false);

  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    setDropDown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for GitHub username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DropDown
          dropDown={dropDown}
          setDropDown={setDropDown}
          fetchRepos={fetchRepos}
          isLoading={isLoading}
          data={data}
        />

        <div className="container">
          {areReposLoading && (
            <p className="text-center">Repos are loading...</p>
          )}

          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
