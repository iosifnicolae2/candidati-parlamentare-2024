"use client";

import { motion } from "framer-motion";
import { romanianCounties } from "../data/counties";
import Link from "next/link";
import { ro } from "../i18n/ro";

export function CountyGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {romanianCounties.map((county, index) => (
        <motion.div
          key={county}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link href={`/judet/${county.toLowerCase()}`}>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {county}
              </h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}