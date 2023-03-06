import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient, type PRICE, type Cuisine, type Location } from "@prisma/client";

const prisma = new PrismaClient();

export type RestaurantCardType = {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
};

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      cuisine: true,
      location: true,
      price: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => {
          return <RestaurantCard key={restaurant.id} restaurant={restaurant} />;
        })}
      </div>
    </main>
  );
}
