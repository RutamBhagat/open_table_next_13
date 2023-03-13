import React from "react";
import { type Item } from "@prisma/client";

const Menu = ({ items }: { items: Item[] }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        {items.length ? (
          <div className="flex flex-wrap justify-center gap-3">
            {items.map((item) => {
              return (
                <div
                  key={item.id}
                  className="block max-w-sm p-6 w-1/2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                    <p className="font-semibold text-gray-700 dark:text-gray-400">{item.price}</p>
                  </div>
                  <p className="font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>This restaurant does not have a menu</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Menu;
