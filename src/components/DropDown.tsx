import { Dispatch, FC, SetStateAction } from "react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { IRepo, IUser } from "../models/models";

interface IDropDownProps {
  fetchRepos: LazyQueryTrigger<
    QueryDefinition<
      string,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      IRepo[] | undefined,
      "api"
    >
  >;
  isLoading: boolean;
  data: IUser[] | undefined;
  dropDown: boolean;
  setDropDown: Dispatch<SetStateAction<boolean>>;
}

const DropDown: FC<IDropDownProps> = ({
  fetchRepos,
  isLoading,
  data,
  dropDown,
  setDropDown,
}) => {
  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropDown(false);
  };

  return (
    <>
      {dropDown && (
        <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
          {isLoading && <p className="text-center">Loading...</p>}
          {data?.map((user) => (
            <li
              key={user.id}
              onClick={() => clickHandler(user.login)}
              className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              {user.login}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DropDown;
