"use client";
import React, { useState } from "react";
import { partySize as partySizes, times } from "@/data";
import shortid from "shortid";
import DatePicker from "react-datepicker";
import useAvailabilities from "@/hooks/useAvailabilities";
import Link from "next/link";
import { convertToDisplayTime } from "@/utils/convertToDisplayTime";

const ReservationCard = ({ open_time, close_time, slug }: { open_time: string; close_time: string; slug: string }) => {
  const { loading, error, data, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(open_time);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  let isWithinTimeWindow = false;
  const timesInWindow = times.filter((time) => {
    if (time.time === open_time) {
      isWithinTimeWindow = true;
    } else if (time.time === close_time) {
      isWithinTimeWindow = false;
    }
    return isWithinTimeWindow;
  });

  const dateChangeHandler = (date: Date | null) => {
    if (date) {
      // date is in this format "2023-01-01T00:00:00.000Z"
      const d = date.toISOString().split("T")[0];
      setDay(d);
      setSelectedDate(date);
      return;
    }
    setSelectedDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  return (
    <div className="fixed bottom-0 right-0 w-[20%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          onChange={(e) => setPartySize(e.target.value)}
          value={partySize}
          name=""
          className="py-3 border-b font-light"
          id=""
        >
          {partySizes.map((size) => (
            <option key={shortid.generate()} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={dateChangeHandler}
            dateFormat="MMMM d"
            className="py-3 border-b font-light text-reg w-full"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            onChange={(e) => setTime(e.target.value)}
            value={time}
            name=""
            id=""
            className="py-3 border-b font-light"
          >
            {timesInWindow.map((time) => (
              <option key={shortid.generate()} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={handleClick}
          disabled={loading}
          className="bg-blue-700 hover:bg-blue-800 rounded w-full px-4 text-white font-bold h-16"
        >
          {loading ? (
            <div className="flex justify-center items-center" role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Find a Time"
          )}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((inst) =>
              inst.available ? (
                <Link key={shortid.generate()}
                  href={`/reserve/${slug}?date=${day}T${inst.time}&partySize=${partySize}`}
                  className="bg-blue-700 hover:bg-blue-800 cursor-pointer p-2 text-center text-white mb-3 rounded mr-3 w-24"
                >
                  <p className="text-sm font-bold">{convertToDisplayTime(inst.time)}</p>
                </Link>
              ) : (
                <div key={shortid.generate()} className="bg-gray-400 p-2 text-center text-white mb-3 rounded mr-3 w-24">Unavailable</div>
              )
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
