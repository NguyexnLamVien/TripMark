import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useUrlPosition from "../hook/useUrlPosition";
import countryCodeToFlagEmoji from "./../hook/useCoverEmoji";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCity } from "../context/CitiesContext";

const BaseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function Form() {
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [emoji, setEmoji] = useState();
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [geoError, setGeoError] = useState(false);

  const navigate = useNavigate();
  const { createCity, isLoading: load } = useCity();
  const { mapLat: lat, mapLng: lng } = useUrlPosition();

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BaseUrl}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        setCity(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(countryCodeToFlagEmoji(data.countryCode));
      } catch (error) {
        setGeoError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!city && !date) return;

    const newCity = {
      cityName: city,
      country: country,
      emoji: emoji,
      date: date,
      notes: note,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoading) return <Spinner />;
  if (geoError) return <p>{geoError}</p>;
  if (!lng && !lat) return <p>Start by clicking on the map</p>;

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={`bg-gray-600 shadow-md rounded-2xl px-4 py-2 w-[100%] mx-auto gap-5 flex flex-col ${
        load ? "loading" : ""
      }`}
    >
      <div>
        <label htmlFor="cityName" className="text-amber-300 ">
          CITY NAME
        </label>
        <div className="bg-white rounded-xl text-black px-2 py-1 flex justify-around">
          <input
            className=" "
            type="text"
            value={`${city}`}
            onChange={(e) => setCity(e.target.value)}
          />
          <span className="">{emoji}</span>
        </div>
      </div>
      <div>
        <label htmlFor="date" className="text-amber-300">
          when did you go to
        </label>
        <DatePicker
          className="bg-white text-black"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div>
        <form className="text-amber-300">Note about your trip to {city}?</form>
        <textarea
          name="note"
          className="bg-white rounded-xl my-1.5 text-black px-2 py-1 "
          id=""
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button className="btn-outline">Add</button>
        {/* component btn back */}
        <button
          className="btn-outline"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    </form>
  );
}
