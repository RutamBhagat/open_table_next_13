import React from "react";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";
import ErrorComponent from "../restaurant/[slug]/components/ErrorComponent";
import { PrismaClient, type Review, type Cuisine, type Location, type PRICE } from "@prisma/client";
import shortid from "shortid";

const prisma = new PrismaClient();

export type searchParamsType = {
  city: string;
  cuisine?: string;
  price?: PRICE;
};

export type SearchRestaurantType = {
  name: string;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  slug: string;
  reviews: Review[];
};

const getRestaurantsByCity = async ({ city, cuisine, price }: searchParamsType): Promise<SearchRestaurantType[]> => {
  const select = {
    name: true,
    main_image: true,
    price: true,
    reviews: true,
    cuisine: true,
    location: true,
    slug: true,
  };

  const where: {
    location?: { name: string };
    cuisine?: { name: string };
    price?: PRICE;
  } = {};

  if (city) {
    where.location = { name: city };
  }
  if (cuisine) {
    where.cuisine = { name: cuisine };
  }
  if (price) {
    where.price = price;
  }

  if (!city && !cuisine && !price) {
    const restaurants = await prisma.restaurant.findMany({
      select,
    });
    return restaurants;
  }

  const restaurants = await prisma.restaurant.findMany({
    where,
    select,
  });
  return restaurants;
};

const getLocations = async () => {
  const locations = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return locations;
};

const getCuisines = async () => {
  const cuisines = await prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return cuisines;
};

const Search = async ({ searchParams }: { searchParams: { city: string; cuisine: string; price: PRICE } }) => {
  const restaurants = await getRestaurantsByCity(searchParams);
  const locations = await getLocations();
  const cuisines = await getCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <div className="w-4/5">
          {!restaurants.length ? (
            <ErrorComponent message={"No restaurants found !!!"} />
          ) : (
            restaurants.map((restaurant) => {
              return <RestaurantCard key={shortid.generate()} restaurant={restaurant} />;
            })
          )}
        </div>
        <div className="w-1/5">
          <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
        </div>
      </div>
    </>
  );
};

export default Search;
