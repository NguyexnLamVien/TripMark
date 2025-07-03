import { useEffect } from "react";
import { useParams } from "react-router";
import { useCity } from "../context/CitiesContext";
import Spinner from "./Spinner";

export default function City() {
  let { id } = useParams();
  const { currentCity, loading, error, getCity } = useCity();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-400">❌ {error}</p>;
  if (!currentCity) return null;

  return (
    <div className="bg-gray-600 shadow-md rounded-2xl px-4 py-2 w-[100%] mx-auto gap-5 flex flex-col">
      <div>
        <h5 className="text-amber-600">CITY NAME</h5>
        <span className="text-white">
          {currentCity.emoji}-{currentCity.cityName}
        </span>
      </div>

      <div>
        <h5 className="text-amber-600">
          Your went to {currentCity.cityName} on
        </h5>
        <span className="text-white">{currentCity.date}</span>
      </div>

      <div>
        <h5 className="text-amber-600">LEARN MORE</h5>
        <a href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}>
          <span className="text-yellow-300 hover:text-gray-900">
            check out {currentCity.cityName} on Wikipedia
          </span>
        </a>
      </div>
    </div>
  );
}
``;
