'use client'
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import contexto from "@/context/context";
import listFactions from '../../../data/factions.json';
import { IFactions } from "@/interfaces";
import Loading from "@/components/loading";

export default function Faction() {
  const params = useParams();
  const faction = params?.faction as string;
  const [dataFaction, setDataFaction] = useState<IFactions | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showFeedback, setShowFeedback, resetPopups } = useContext(contexto);

  useEffect(() => {
    resetPopups();
    const findFaction = listFactions.find(
      (frm: IFactions) => faction === frm.name.toLowerCase()
    );
    setDataFaction(findFaction ?? null);
  }, []);

  if (dataFaction) {
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
                  src={`/images/glifs/${dataFaction.name}.png`}
                  alt={`Glifo dos ${dataFaction.namePtBr}`}
                  className="w-10/12 sm:w-38 my-2"
                  width={800}
                  height={400}
                  onLoad={() => setIsLoading(false)}
                />
              </div>
              <div className="mt-4 mobile:mt-4 px-6 text-sm sm:text-base w-full">
                <h2 className="font-bold text-xl sm:text-2xl w-full text-center">
                  { dataFaction.namePtBr }
                </h2>
                <div>
                  {
                    dataFaction.description.map((desc: string, index: number) => (
                      <p key={ index } className="pt-3">{ desc }</p>
                    ))
                  }
                </div>
                <h2 className="pt-3 font-bold">Rivais:</h2>
                <hr className="w-full mb-2" />
                <div>
                  {
                    dataFaction.rivals.map((desc: string, index: number) => (
                      <p key={ index } className="pt-3">{ desc }</p>
                    ))
                  }
                </div>
                <h2 className="pt-3 font-bold">Casas:</h2>
                <hr className="w-full mb-2" />
                <div>
                  {
                    dataFaction.houses.map((desc: string, index: number) => (
                      <p key={ index } className="pt-3">{ desc }</p>
                    ))
                  }
                </div>
                <h2 className="pt-3 font-bold">Líderes:</h2>
                <hr className="w-full mb-2" />
                <div>
                  {
                    dataFaction.leaders.map((desc: string, index: number) => (
                      <p key={ index } className="pt-3">{ desc }</p>
                    ))
                  }
                </div>
                <h2 className="pt-3 font-bold">Objetivos:</h2>
                <hr className="w-full mb-2" />
                <div>
                  {
                    dataFaction.objectives.map((desc: string, index: number) => (
                      <p key={ index } className="pt-3">{ desc }</p>
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
            // showFeedback && <Feedback title={ dataFaction.name } /> 
          }
        </div>
        <Footer />
      </div>
    );
} return (
    <div className="w-full bg-ritual bg-cover bg-top relative h-screen">
      <div className="absolute w-full h-full bg-black/80" />
      <Nav />
      <Loading />
    </div>
  );
}