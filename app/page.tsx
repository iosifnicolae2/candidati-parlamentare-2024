"use client";
import { CountySearch } from "./components/county-search";
import { CountyGrid } from "./components/county-grid";
import { motion } from "framer-motion";
import { ro } from "./i18n/ro";
import Link from "next/link";
import {Footer} from "./components/footer";

export default function Home() {
  const popularCounties = ["București", "Cluj", "Iași", "Timiș", "Constanța"];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {ro.home.title}
          </h1>
          {/*<p className="text-xl text-gray-600 dark:text-gray-300 mb-8">*/}
          {/*  {ro.home.subtitle}*/}
          {/*</p>*/}

          <div className="flex items-center justify-center gap-2 mt-8 mb-8">
            {/*<MapPin className="h-5 w-5 text-gray-500" />*/}
            <CountySearch onCountySelect={(countySlug) => {
              window.location.href = `candidati/${countySlug}`;
            }} />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {popularCounties.map((county) => (
              <Link
                key={county}
                href={`/candidati/${county.toLowerCase()}`}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                {county}
              </Link>
            ))}
          </div>
        </motion.div>

        <div className="mx-auto sm:w-3/4">
          {/*<div className="md:col-span-2">*/}
          {/*  <h2 className="text-2xl font-semibold mb-6">{ro.home.popularCounties}</h2>*/}
          {/*  <CountyGrid />*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <LatestUpdates />*/}
          {/*</div>*/}
          <div>
            {/*<h2 className="text-2xl font-semibold mb-6">{ro.home.popularCounties}</h2>*/}
            <CountyGrid/>
          </div>
          <Footer/>
        </div>
      </div>
    </main>
  );
}