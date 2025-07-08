import { useCity } from "../context/CitiesContext";
import Spinner from "./Spinner";
import { Link } from "react-router";

const formatDate = (date) =>
  new Date(date).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default function CitiesList() {
  const { cities, isLoading } = useCity();

  if (isLoading) {
    return <Spinner />;
  }
  if (!cities) return null;
  if (!cities.length) {
    return <p>Add your first city</p>;
  }

  return (
    <div className="cityList">
      <ul className="flex flex-col gap-4 ">
        {cities.map((city) => (
          <CityItem key={city.id} cities={city} />
        ))}
      </ul>
    </div>
  );
}

function CityItem({ cities }) {
  const { currentCity } = useCity();
  const { cityName, emoji, date, id, position } = cities;

  const { deleteCity } = useCity();

  function handleDeleteCity(e) {
    e.preventDefault();
    e.stopPropagation();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`flex justify-between items-center gap-4 bg-gray-500 px-2 py-1 rounded-md  border-2 ${
          currentCity?.id == id ? "border-amber-500" : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span>{emoji}</span>
        <h3>{cityName}</h3>
        <time>({formatDate(date)})</time>
        <button
          className="bg-red-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-900 text-xl font-bold transition duration-200"
          onClick={handleDeleteCity}
          type="button"
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
