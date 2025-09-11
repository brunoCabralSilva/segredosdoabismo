"use client"
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import listHouses from '../../data/houses.json';
import Link from "next/link";
import Image from "next/image";

export default function Houses() {
  return(
    <div className="w-full bg-[url('/images/wallpapers/04.png')] bg-top bg-cover relative">
    <Nav />
    <div className="absolute w-full h-full" />
    <section className="min-h-screen bg-black/90 relative w-full h-full flex flex-col items-center">
      <div className="py-6 px-5  text-white flex flex-col items-center sm:items-start text-justify min-h-screen w-full xl:min-w-[1150px] lg:max-w-[1150px]">
        <div className="px-4 w-full">
          <h1 className="text-4xl relative">Casas</h1>
          <hr className="w-full my-6" />
          <p className="pb-2">
            
          
          </p>
        </div>
        <div className="grid grid-cols-1 mobile:grid-cols-2 sm:grid-cols-3 gap-3 w-full relative text-white px-4 pb-4">
          {
            listHouses
              .sort((a, b) => a.number - b.number)
              .map((house, index) => (
              <Link
                key={ index }
                href={`/houses/${house.name.replace('í', 'i').toLowerCase()}`}
                className="border-white border-2 p-3 flex items-center justify-center flex-col bg-trybes-background bg-center relative cursor-pointer h-20vh"
              >
              <div className="absolute w-full h-full bg-black/80" />
                <Image
                    key={ index }
                    src={ `/images/glifs/${house.name}.png` }
                    alt={`Glifo ${house.name}`}
                    className={`h-14 w-20 object-contain object-center mb-3 z-20`}
                    width={ 1200 }
                    height={ 800 }
                  />
                <p className="relative font-bold text-center z-20">
                  { house.namePtBr }
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