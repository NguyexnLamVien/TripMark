import { useCity } from "../context/CitiesContext";
import Spinner from "./Spinner";

export default function CountryList() {
  const { isLoading, cities } = useCity();

  if (isLoading == "true") {
    return <Spinner />;
  }

  if (!cities) {
    return alert("No cities found");
  }
  if (!cities.length) {
    return <p>Add your first cities</p>;
  }

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((city) => city.country).includes(cities.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <div className="cityList">
      <ul className="flex flex-col gap-4 ">
        {countries.map((country, index) => (
          <CountryItem key={index} country={country} />
        ))}
      </ul>
    </div>
  );
}

function CountryItem({ country }) {
  return (
    <li className="flex justify-between items-center gap-4 bg-amber-800 px-2 py-1 rounded-md text-white">
      <span> {country.country}</span>
      <span>{country.emoji}</span>
    </li>
  );
}
