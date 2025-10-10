'use client'
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import contexto from "@/context/context";
import listHouses from '../../../data/houses.json';
import { IHouses } from "@/interfaces";
import Loading from "@/components/loading";

export default function Faction() {
  const params = useParams();
  const house = params?.house as string;
  const [dataHouse, setDataHouse] = useState<IHouses | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showFeedback, setShowFeedback, resetPopups } = useContext(contexto);

  useEffect(() => {
      resetPopups();
      const findFaction = listHouses.find(
        (frm: IHouses) => house === frm.name.toLowerCase()
      );
      setDataHouse(findFaction ?? null);
    }, []);
  
  function returnDoctrines(doctrines: string[]): string {
    if (!doctrines || doctrines.length === 0) return "";
    if (doctrines.length === 1) return doctrines[0];
    if (doctrines.length === 2) return `${doctrines[0]} e ${doctrines[1]}`;
    return doctrines.slice(0, -1).join(", ") + " e " + doctrines[doctrines.length - 1];
  }

  if (dataHouse) {
    return(
      <div>
        <div className="w-full bg-[url('/images/wallpapers/06.png')] bg-top bg-cover relative text-left">
          <Nav />
          <div className="absolute w-full h-full" />
          <section className="min-h-screen bg-black/95 relative w-full h-full flex flex-col items-center">
            <div className="py-6 px-5 text-white flex flex-col items-center sm:items-start text-justify min-h-screen w-full xl:min-w-[1150px] lg:max-w-[1150px]">
              <div className="flex items-center justify-center w-full relative h-full">
                <div className="absolute h-full w-full sm:w-5/12 flex items-center justify-center">
                  { isLoading && <Loading /> }
                </div>
                <Image
                  src={`/images/glifs/${dataHouse.name}.png`}
                  alt={`Glifo dos ${dataHouse.namePtBr}`}
                  className="w-10/12 sm:w-38 my-2"
                  width={800}
                  height={400}
                  onLoad={() => setIsLoading(false)}
                />
              </div>
              <div className="mt-4 mobile:mt-4 px-6 text-sm sm:text-base w-full">
                <h2 className="font-bold text-xl sm:text-2xl w-full text-center">
                  { dataHouse.namePtBr }
                </h2>
                <div className="pt-10">
                  <span className="font-bold">Tormento Inicial:</span> { dataHouse.initialTorment }
                </div>
                <div>
                  <span className="font-bold">Doutrinas da Casa:</span> { returnDoctrines(dataHouse.doctrines) }
                </div>
                <div className="pt-3">
                  {
                    dataHouse.description.map((desc: string, index: number) => (
                      <p key={ index } className="pt-1">{ desc }</p>
                    ))
                  }
                </div>
                <h2 className="pt-3 font-bold">Facções:</h2>
                <hr className="w-full mb-2" />
                <div>
                  {
                    dataHouse.factions.map((faction: string, index: number) => (
                      <p key={ index } className="pt-1">{ faction }</p>
                    ))
                  }
                </div>
                <h2 className="pt-3 font-bold">Prelúdio:</h2>
                <hr className="w-full mb-2" />
                <div>
                  {
                    dataHouse.preludio.map((prelud: string, index: number) => (
                      <p key={ index } className="pt-1">{ prelud }</p>
                    ))
                  }
                </div>
                <h2 className="pt-3 font-bold">Fé:</h2>
                <hr className="w-full mb-2" />
                <div>
                  {
                    dataHouse.faith.map((fai: string, index: number) => (
                      <p key={ index } className="pt-1">{ fai }</p>
                    ))
                  }
                </div>
                <h2 className="pt-3 font-bold">Criação de Personagem:</h2>
                <hr className="w-full mb-2" />
                <div>
                  {
                    dataHouse.playerCreation.map((playerC: string, index: number) => (
                      <p key={ index } className="pt-1">{ playerC }</p>
                    ))
                  }
                </div>
                <h2 className="pt-3 font-bold">Fraquezas:</h2>
                <hr className="w-full mb-2" />
                <div>
                  {
                    dataHouse.fraquezas.map((fraq: string, index: number) => (
                      <p key={ index } className="pt-1">{ fraq }</p>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="w-full relative flex items-center justify-center z-30">
              <button
                type="button"
                className="px-6 text-orange-300 hover:text-orange-600 transition-colors duration-300 mt-5 cursor-pointer underline"
                // onClick={() => setShowFeedback(true) }
              >
                Enviar Feedback
              </button>
            </div>
          </section>
          {
            // showFeedback && <Feedback title={ dataHouse.name } /> 
          }
        </div>
        <Footer />
      </div>
    );
} 
return (
    <div className="w-full bg-green-800 bg-cover bg-top relative h-screen">
      <div className="absolute w-full h-full bg-black/80" />
      <Nav />
      <Loading />
    </div>
  );
}