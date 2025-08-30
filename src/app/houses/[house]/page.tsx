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
        <div className="w-full bg-ritual bg-cover bg-top relative">
          <div className="absolute w-full h-full bg-black/90 z-20" />
          <Nav />
          <section className="mb-2 relative px-2 min-h-screen z-30">
            <div className="py-10 flex flex-col items-center sm:items-start w-full z-20 text-white text-justify overflow-y-auto">
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
                <div>
                  Tormento Inicial: { dataHouse.initialTorment }
                </div>
                <div>
                  Doutrinas da Casa: { returnDoctrines(dataHouse.doctrines) }
                </div>
                <div>
                  {
                    dataHouse.description.map((desc: string, index: number) => (
                      <p key={ index } className="pt-3">{ desc }</p>
                    ))
                  }
                </div>
                <h2>Facções:</h2>
                <div>
                  {
                    dataHouse.factions.map((faction: string, index: number) => (
                      <p key={ index } className="pt-3">{ faction }</p>
                    ))
                  }
                </div>
                <h2>Prelúdio:</h2>
                <div>
                  {
                    dataHouse.preludio.map((prelud: string, index: number) => (
                      <p key={ index } className="pt-3">{ prelud }</p>
                    ))
                  }
                </div>
                <h2>Fé:</h2>
                <div>
                  {
                    dataHouse.faith.map((fai: string, index: number) => (
                      <p key={ index } className="pt-3">{ fai }</p>
                    ))
                  }
                </div>
                <h2>Criação de Personagem:</h2>
                <div>
                  {
                    dataHouse.playerCreation.map((playerC: string, index: number) => (
                      <p key={ index } className="pt-3">{ playerC }</p>
                    ))
                  }
                </div>
                <h2>Fraquezas:</h2>
                <div>
                  {
                    dataHouse.fraquezas.map((fraq: string, index: number) => (
                      <p key={ index } className="pt-3">{ fraq }</p>
                    ))
                  }
                </div>
              </div>
            </div>
          </section>
          <div className="w-full relative flex items-center justify-center z-30">
            <button
              type="button"
              className="px-6 text-orange-300 hover:text-orange-600 transition-colors duration-300 mt-5 cursor-pointer underline"
              // onClick={() => setShowFeedback(true) }
            >
              Enviar Feedback
            </button>
          </div>
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