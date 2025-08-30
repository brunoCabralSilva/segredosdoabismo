"use client"

import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Image from "next/image";
import Link from "next/link";
import listFactions from '../../data/factions.json';

export default function Factions() {
  return(
    <div className="w-full bg-[] bg-cover bg-top relative">
    <Nav />
    <div className="absolute w-full h-full bg-black/80" />
    <section className="mb-2 min-h-screen relative pb-5">
    <div className="py-6 px-5 bg-black/90 text-white flex flex-col items-center sm:items-start text-justify">
        <h1 className="text-4xl relative">Facções</h1>
        <hr className="w-10/12 my-6" />
        <p className="pb-2">
        
        </p>
        <div className="grid grid-cols-1 mobile:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full relative text-white px-4 pb-4">
          {
            listFactions
              .map((faction, index) => (
              <Link
                key={ index }
                href={`/factions/${faction.name.replace('í', 'i').toLowerCase()}`}
                className="border-white border-2 p-3 flex items-center justify-center flex-col bg-trybes-background bg-center relative cursor-pointer h-20vh"
              >
              <div className="absolute w-full h-full bg-black/80" />
                <Image
                  key={ index }
                  src={ `/images/glifs/${faction.name}.png` }
                  alt={`Glifo ${faction.name}`}
                  className={`h-14 w-20 object-contain object-center mb-3 z-20`}
                  width={ 1200 }
                  height={ 800 }
                />
                <p className="relative font-bold text-center z-20">
                  { faction.namePtBr }
                </p>
              </Link>
            ))
          }
        </div>
        <button
          type="button"
          className="pb-3 px-6 text-orange-300 hover:text-orange-600 transition-colors duration-300 mt-5 cursor-pointer underline"
          // onClick={() => setShowFeedback(true) }
        >
          Enviar Feedback
        </button>
        {
          // showFeedback && <Feedback title={ 'Página "Casas"'} /> 
        }
      </div>
    </section>
    <Footer />
</div>
  )
}