'use client'
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import contexto from "@/context/context";
import listFactions from '../../../data/factions.json';

export default function Faction() {
  const params = useParams();
  const faction = params?.faction as string;
  const [dataFaction, setDataFaction] = useState<any>(null);
  var [isLoading, setIsLoading] = useState<boolean>(false);
  const { showFeedback, setShowFeedback, resetPopups } = useContext(contexto);

  useEffect(() => {
    resetPopups();
    const findForm: any = listFactions
      .find((frm: any) => {
        if (params.faction === 'hominideo') {
          return 'hominídeo' === frm.name.toLowerCase()
        } return faction === frm.name.toLowerCase()
      }
    );
    setDataFaction(findForm);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dataFaction) {
    return(
      <div>
        <div className="w-full bg-ritual bg-cover bg-top relative">
          <div className="absolute w-full h-full bg-black/90 z-20" />
          <Nav />
          <section className="mb-2 relative px-2 min-h-screen z-30">
            <div className="py-10 flex flex-col items-center sm:items-start w-full z-20 text-white text-justify overflow-y-auto">
              <div className="flex items-center justify-center w-full relative h-full">
                <div className="absolute h-full w-full sm:w-5/12 flex items-center justify-center">
                  { isLoading && <span className="loader z-50" /> }
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
      <span className="loader z-50" />
    </div>
  );
}