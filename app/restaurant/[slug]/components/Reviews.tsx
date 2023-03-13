import StarsComponent from "@/app/components/StarsComponent";
import React from "react";
import { type Review } from "@prisma/client";
import shortid from "shortid";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">What {reviews.length} people are saying...</h1>
      <div>
        {reviews.map((review) => {
          return (
            <div key={shortid.generate()} className="border-b pb-7 mb-7">
              <div className="flex">
                <div className="w-1/6 flex flex-col items-center">
                  <div className="rounded-full bg-[#29206e] w-16 h-16 flex items-center justify-center">
                    <h2 className="text-white text-2xl uppercase">
                      {review.first_name[0]}
                      {review.last_name[0]}
                    </h2>
                  </div>
                  <p className="text-lg font-light">
                    {review.first_name} {review.last_name}
                  </p>
                </div>
                <div className="ml-10 w-5/6">
                  <div className="flex items-center">
                    <StarsComponent stars={review.rating} />
                  </div>
                  <div className="mt-5">
                    <p className="mb-6 text-base text-start font-normal text-gray-500 dark:text-gray-400">
                      {review.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
