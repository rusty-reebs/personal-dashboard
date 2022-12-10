import { Image } from "@mantine/core";
import { useEffect, useState } from "react";
import useSWR from "swr";
import format from "date-fns/format";

export default function Weather() {
  const fetcher = () =>
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=11.25292&lon=-85.87049&exclude=minutely&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`,
      { mode: "cors" }
    ).then((result) => result.json());

  const {
    data,
    // data: {
    //   current: { feels_like, temp, wind_speed },
    // },
    isLoading,
  } = useSWR(`/weather`, fetcher);

  return (
    <div className="flex flex-col gap-4 p-10 w-fit rounded-lg bg-four border-[0.5px] border-three text-five">
      <h2>SJDS Weather</h2>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div>
              <p>Now</p>
              <Image
                src={`/img/new${data.current.weather[0].icon}.png`}
                alt={`${data.current.weather[0].icon}`}
                height={64}
                fit="contain"
              />
              <p>
                It's {Math.round(data?.current?.temp)}&deg;C, feels like{" "}
                {Math.round(data?.current?.feels_like)}
                &deg;C and the wind is{" "}
                {Math.round(data?.current?.wind_speed * 3.6)} km/hr.
              </p>
            </div>
            <div>
              <p>Later</p>
              <Image
                src={`/img/new${data.hourly[3].weather[0].icon}.png`}
                alt={`${data.hourly[3].weather[0].icon}`}
                height={64}
                fit="contain"
              />
            </div>
            <div>
              <p>Tomorrow</p>
              <Image
                src={`/img/new${data.daily[1].weather[0].icon}.png`}
                alt={`${data.daily[1].weather[0].icon}`}
                height={64}
                fit="contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
