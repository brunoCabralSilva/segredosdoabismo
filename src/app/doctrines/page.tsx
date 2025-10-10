"use client"
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import listDoctrines from '../../data/doctrines.json';
import listHouses from '../../data/houses.json';
import Link from "next/link";
import Image from "next/image";
import { IDoctrines } from "@/interfaces";

type DoctrinesByBelonging = Record<string, IDoctrines[]>;

export default function Doctrines() {

  const groupedDoctrines = listDoctrines.reduce<DoctrinesByBelonging>((acc, doctrine) => {
    const group = doctrine.belonging;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(doctrine);
    return acc;
  }, {});

  const getHouseName = (belonging: string) => {
    const house = listHouses.find(house => house.name === belonging);
    return house ? house.namePtBr : 'Comuns';
  };

  return (
    <div className="w-full bg-[url('/images/wallpapers/03.png')] bg-top bg-cover relative">
      <Nav />
      <div className="absolute w-full h-full" />
      <section className="min-h-screen bg-black/90 relative w-full h-full flex flex-col items-center">
        <div className="py-6 px-5  text-white flex flex-col items-center sm:items-start text-justify min-h-screen w-full xl:min-w-[1150px] lg:max-w-[1150px]">
          <div className="px-4 w-full">
            <h1 className="text-4xl relative">Doutrinas</h1>
            <hr className="w-full my-6" />
            <p className="pb-2">
            </p>
          </div>
          <div className="w-full relative text-white px-4 pb-4">
            {
              Object.keys(groupedDoctrines).map((group, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-2xl font-semibold text-center mb-4">
                    { getHouseName(group) }
                  </h2>
                  <div className="grid grid-cols-1 mobile:grid-cols-2 sm:grid-cols-3 gap-3">
                    {
                      groupedDoctrines[group].map((doctrine: IDoctrines, index: number) => (
                        <Link
                          key={index}
                          href={`/doctrines/${doctrine.id}`}
                          className="border-white border-2 p-3 flex items-center justify-center flex-col bg-trybes-background bg-center relative cursor-pointer h-20vh"
                        >
                          <div className="absolute w-full h-full bg-black/80" />
                          <Image
                            src={`/images/glifs/${doctrine.belonging}.png`}
                            alt={`Glifo ${doctrine.name}`}
                            className="h-14 w-20 object-contain object-center mb-3 z-20"
                            width={1200}
                            height={800}
                          />
                          <p className="relative font-bold text-center z-20">
                            {doctrine.name}
                          </p>
                        </Link>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>

          <button
            type="button"
            className="pb-3 px-6 text-orange-300 hover:text-orange-600 transition-colors duration-300 mt-5 cursor-pointer underline"
          >
            Enviar Feedback
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
