import ErrorComponent from "@/app/restaurant/[slug]/components/ErrorComponent";
import { PrismaClient } from "@prisma/client";
import React from "react";
import Form from "./components/Form";
import Header from "./components/Header";

const prisma = new PrismaClient();

export default async function ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    date: string;
    partySize: string;
  };
}) {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      id: true,
      main_image: true,
      name: true,
    },
  });

  if (!restaurant) {
    return <ErrorComponent message="Restaurant not found" />;
  }

  return (
    <div className="min-h-screen py-10">
      <div className="p-8 py-10 w-3/5 m-auto rounded-lg bg-[#dee3ea]">
        <Header
          image={restaurant.main_image}
          name={restaurant.name}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
        <div className="flex justify-center items-center">
          <Form slug={params.slug} date={searchParams.date} partySize={searchParams.partySize} />
        </div>
      </div>
    </div>
  );
}
