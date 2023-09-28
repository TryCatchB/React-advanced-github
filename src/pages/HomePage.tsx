import { FC } from "react";
import { useSearchUsersQuery } from "../store/github/github.api";

const HomePage: FC = () => {
  const { isLoading, isError, data } = useSearchUsersQuery();

  return <div>HomePage</div>;
};

export default HomePage;
