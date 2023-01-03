import { Image, Loader } from "@mantine/core";
import useSWR from "swr";

export default function Weather() {
  const fetcher = () =>
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=11.25292&lon=-85.87049&exclude=minutely&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`,
      { mode: "cors" }
    ).then((result) => result.json());

  const { data, isLoading, error } = useSWR(`/weather`, fetcher, {
    refreshInterval: 300000,
  });

  const blurb = `It's ${Math.round(data?.current?.temp)}\u00B0C,
  feels like ${Math.round(
    data?.current?.feels_like
  )}\u00B0C and the wind is ${Math.round(
    data?.current?.wind_speed * 3.6
  )} km/hr`;

  if (error) console.log(error);

  return (
    <div className="flex flex-col gap-4">
      {error ? (
        <div className="mx-auto my-auto">⚠️</div>
      ) : isLoading ? (
        <Loader variant="dots" color="#AF0404" className="mx-auto mb-8" />
      ) : (
        <div className="flex flex-col gap-2 w-full text-sm">
          <div className="flex flex-row gap-4 justify-between">
            <div className="flex flex-col gap-1 items-center">
              <p className="text-sm uppercase">Now</p>
              <Image
                src={`/img/new${data?.current?.weather[0]?.icon}.png`}
                alt={`${data?.current?.weather[0]?.icon}`}
                height={64}
                fit="contain"
              />
            </div>
            <div className="flex flex-col gap-1 items-center">
              <p className="text-sm uppercase">Later</p>
              <Image
                src={`/img/new${data?.hourly[3]?.weather[0]?.icon}.png`}
                alt={`${data?.hourly[3]?.weather[0]?.icon}`}
                height={64}
                fit="contain"
              />
            </div>
            <div className="flex flex-col gap-1 items-center">
              <p className="text-sm uppercase">Tomorrow</p>
              <Image
                src={`/img/new${data?.daily[1]?.weather[0]?.icon}.png`}
                alt={`${data?.daily[1]?.weather[0]?.icon}`}
                height={64}
                fit="contain"
              />
            </div>
          </div>
          <p className="mx-auto">{blurb}</p>
        </div>
      )}
    </div>
  );
}
