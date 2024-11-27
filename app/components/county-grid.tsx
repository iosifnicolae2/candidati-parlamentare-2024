"use client";

import { motion } from "framer-motion";
import { romanianCounties } from "../data/counties";
import Link from "next/link";
import { ro } from "../i18n/ro";

export function CountyGrid() {
  const sortedCounties = Object.entries(romanianCounties).sort(([slugA, countyA], [slugB, countyB]) => {
    if (slugA === 'municipiul-bucuresti') return -1;
    if (slugB === 'municipiul-bucuresti') return 1;
    if (slugA === 'diaspora') return 1;
    if (slugB === 'diaspora') return -1;
    return countyA.name.localeCompare(countyB.name);
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {sortedCounties.map(([countySlug, county], index) => (
        <motion.div
          key={countySlug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.01 }}
        >
          <Link href={`/candidati/${countySlug}`}>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-100 cursor-pointer">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {county.name}
              </h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
