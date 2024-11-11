import React from "react";
import { RadioProps } from "../types";
import Link from "next/link";

const Radio: React.FC<RadioProps> = ({ workouts }) => {
  return (
    <div className="pt-5">
      <ul className="grid w-full gap-6 md:grid-cols-1">
        {workouts?.map((data, index) => (
          <li key={index}>
            <input
              type="radio"
              id={`workout-${index}`}
              name="workout"
              value={data}
              className="hidden peer"
              required
            />
            <Link
              href={{
                pathname: "/currentWorkout",
                query: { workout: data },
              }}
              passHref
            >
              <label
                htmlFor={`workout-${index}`}
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-purple rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-purple dark:peer-checked:text-blue-500 peer-checked:border-purple peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-darkPurple dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">{data}</div>
                </div>
                <svg
                  className="w-5 h-5 ms-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </label>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Radio;
