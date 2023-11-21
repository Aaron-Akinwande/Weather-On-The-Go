import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function test() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [errorCatch, setErrorcatch] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=d73b6de9aeb76d5d066880307276891d`;

  // const getRequest = async () => {
  //   const response = await axios.get(url)
  //   return response.data
  // };
  // const queryKeys = {
  //   getSearch: "getSearch"
  // }
  // const getRequest = async () => {
  //   try {
  //     const response = await fetch(url); // Replace with your API endpoint
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     throw new Error('Error fetching data');
  //   }
  // };

  //   const {data:searchData, status} = useQuery({
  //  queryKeys: [queryKeys.getSearch],
  //  queryFn: getRequest
  // })
  //   setData(searchData)

  // const search = (e) => {
  //   if (e.key === 'Enter') {

  //     axios.get(url).then((rez) => {
  //       setData(rez.data)
  //       console.log(rez.data)
  //     })
  //     setLocation("")
  //   }
  // }

  const search = async (e) => {
    if (e.key === "Enter") {
      try {
        const rez = await axios.get(url);
        setData(rez.data);
        console.log(rez.data);
        setLocation("");
        setErrorcatch(false);
      } catch (error) {
        setErrorcatch(true);
        data.name = undefined;
        // alert("Location could not be found, please try again");
      }
    }
  };

  return (
    <div>
      <div className=" w-full h-screen bg-cover bg-[url('/sunset.jpg')] font-bold text-white top-0 left-0">
        <div className=" text-center p-4">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={search}
            placeholder="Enter Location"
            type="text"
            className=" py-3 px-5 rounded-3xl border border-white bg-black bg-opacity-10 placeholder:text-white"
          />
        </div>
        {errorCatch ? (
          <div className=" flex justify-center items-center w-full py-4 px-auto">
            <div className=" text-4xl  lg:text-6xl">Location Not Found <br/> Please try again</div>
          </div>
        ) : null}
        {data.name != undefined ? (
          <div className=" w-10/12 h-3/4 m-auto py-0 px-4 relative top-[10%] flex flex-col justify-between">
            <div className=" w-full my-4 mx-auto">
              <div className="location">
                <p className=" text-xl">{data.name}</p>
              </div>
              <div className="temp">
                <p className=" text-8xl">{data.main.temp.toFixed()} F</p>
              </div>
              <div className=" relative -right-[90%] origin-[0_0] rotate-[269deg] ">
                <p className=" text-xl">{data.weather[0].main}</p>
              </div>
            </div>

            <div className=" flex justify-evenly gap-3 text-center w-full my-4 mx-auto p-4 rounded-xl bg-white bg-opacity-40">
              <div className="feels">
                <p className=" text-xl">Feels Like</p>
                <p className=" text-xl">{data.main.feels_like.toFixed()} F</p>
              </div>
              <div className="humidity">
                <p className=" text-xl">Humidity</p>
                <p className=" text-xl">{data.main.humidity}%</p>
              </div>
              <div className="wind">
                <p className=" text-xl">Wind Speed</p>
                <p className=" text-xl">{data.wind.speed.toFixed()} MPH</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
