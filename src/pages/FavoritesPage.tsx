import { FC } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

const FavoritesPage: FC = () => {
  const { favorites } = useAppSelector((state) => state.gitHub);

  if (favorites.length === 0) {
    return <p className="text-center">No items</p>;
  }

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favorites.map((f) => (
          <li key={f}>
            <a href={f} target="blank">
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
