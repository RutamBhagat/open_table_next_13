"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const RestaurantNavbar = ({ slug }: { slug: string }) => {
  const currentPathname = usePathname();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="mr-2">
          <Link
            href={`/restaurant/${slug}`}
            className={`${
              `/restaurant/${slug}` === currentPathname
                ? "text-blue-600 hover:text-blue-800 border-b-2 border-blue-600 hover:border-blue-800"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } inline-flex p-4 rounded-t-lg active group`}
            aria-current="page"
          >
            <svg
              aria-hidden="true"
              className={`${
                `/restaurant/${slug}` === currentPathname
                  ? "text-blue-600 group-hover:text-blue-800"
                  : "text-gray-400 group-hover:text-gray-500"
              } w-5 h-5 mr-2`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            Overview
          </Link>
        </li>
        <li className="mr-2">
          <Link
            href={`restaurant/${slug}/menu`}
            className={`${
              `/restaurant/${slug}/menu` === currentPathname
                ? "text-blue-600 hover:text-blue-800 border-b-2 border-blue-600 hover:border-blue-800"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } inline-flex p-4 rounded-t-lg active group`}
          >
            <svg
              aria-hidden="true"
              className={`${
                `/restaurant/${slug}/menu` === currentPathname
                  ? "text-blue-600 group-hover:text-blue-800"
                  : "text-gray-400 group-hover:text-gray-500"
              } w-5 h-5 mr-2`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              ></path>
            </svg>
            Menu
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default RestaurantNavbar;
