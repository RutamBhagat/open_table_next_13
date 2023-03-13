import { PRICE } from "@prisma/client";
import React from "react";
import Link from "next/link";
import { type searchParamsType } from "../page";

const SearchSideBar = ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: { id: number; name: string }[];
  cuisines: { id: number; name: string }[];
  searchParams: searchParamsType;
}) => {
  return (
    <div className="w-full p-3 mt-3 bg-[#dee3ea] rounded-lg">
      <div className="border-b pb-4">
        <h1 className="mb-2 font-semibold">Region</h1>
        {locations.map((inst) => {
          return (
            <div key={inst.id}>
              <Link
                href={{
                  pathname: "/search",
                  query: {
                    ...searchParams,
                    city: inst.name,
                  },
                }}
                className={`${
                  searchParams.city === inst.name ? "text-blue-800" : ""
                } font-light text-reg text-start capitalize`}
              >
                {inst.name}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2 font-semibold">Cuisine</h1>
        {cuisines.map((inst) => {
          return (
            <div key={inst.id}>
              <Link
                href={{
                  pathname: "/search",
                  query: {
                    ...searchParams,
                    cuisine: inst.name,
                  },
                }}
                className={`${
                  searchParams.cuisine === inst.name ? "text-blue-800" : ""
                } font-light text-reg text-start capitalize`}
              >
                {inst.name}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2 font-semibold">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.CHEAP,
              },
            }}
            className={`${
              searchParams.price === "CHEAP" ? "text-blue-800" : ""
            } border w-full text-reg font-light rounded-l p-2 text-center`}
          >
            $
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.REGULAR,
              },
            }}
            className={`${
              searchParams.price === "REGULAR" ? "text-blue-800" : ""
            } border-r border-t border-b w-full text-reg font-light p-2 text-center`}
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.EXPENSIVE,
              },
            }}
            className={`${
              searchParams.price === "EXPENSIVE" ? "text-blue-800" : ""
            } border-r border-t border-b w-full text-reg font-light p-2 rounded-r text-center`}
          >
            $$$
          </Link>
        </div>
      </div>
      <div className="mt-3 pb-4">
        <Link href="/search" className="mb-2">
          See all restaurants
        </Link>
      </div>
    </div>
  );
};

export default SearchSideBar;
