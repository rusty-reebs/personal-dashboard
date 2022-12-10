import { Image, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import useSWR from "swr";
import format from "date-fns/format";
import { LoadingOverlay } from "@mantine/core";

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
  } = useSWR(`/weather`, fetcher, { refreshInterval: 5000 });

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <Loader variant="dots" color="#AF0404" className="mx-auto mb-8" />
      ) : (
        <div className="flex flex-col gap-2 w-full text-sm">
          <div className="flex flex-row gap-4 justify-between">
            <div className="flex flex-col gap-1 items-center">
              <p className="text-sm uppercase">Now</p>
              <Image
                src={`/img/new${data.current.weather[0].icon}.png`}
                alt={`${data.current.weather[0].icon}`}
                height={64}
                fit="contain"
              />
            </div>
            <div className="flex flex-col gap-1 items-center">
              <p className="text-sm uppercase">Later</p>
              <Image
                src={`/img/new${data.hourly[3].weather[0].icon}.png`}
                alt={`${data.hourly[3].weather[0].icon}`}
                height={64}
                fit="contain"
              />
            </div>
            <div className="flex flex-col gap-1 items-center">
              <p className="text-sm uppercase">Tomorrow</p>
              <Image
                src={`/img/new${data.daily[1].weather[0].icon}.png`}
                alt={`${data.daily[1].weather[0].icon}`}
                height={64}
                fit="contain"
              />
            </div>
          </div>
          <p className="mx-auto">
            It's {Math.round(data?.current?.temp)}&deg;C, feels like{" "}
            {Math.round(data?.current?.feels_like)}
            &deg;C and the wind is {Math.round(
              data?.current?.wind_speed * 3.6
            )}{" "}
            km/hr
          </p>
        </div>
      )}
    </div>
  );
}
