'use client'
import { useParams } from "next/navigation";
import listDoctrines from '../../../data/doctrines.json';
import { useEffect, useState } from "react";
import { IDoctrines, IListApocaliptycForm, IListDoctrines } from "@/interfaces";
import Nav from "@/components/nav";
import LevelDoctrine from "../levelDoctrine";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Footer from "@/components/footer";

export default function Doctrine() {
  const params = useParams();
  const doctrine = params?.doctrine as string;
  const [doctrines, setDoctrines] = useState<IDoctrines | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
  if (doctrine) {
    const found = listDoctrines.find((doctr: IDoctrines) => doctr.id === doctrine);
    setDoctrines(found ?? null);
  }
}, [doctrine]);

  return(
    <div className="w-full bg-[url('/images/wallpapers/06.png')] bg-top bg-cover relative text-left">
      <Nav />
      <div className="absolute w-full h-full" />
      <section className="min-h-screen bg-black/95 relative w-full h-full flex flex-col items-center">
        <div className="py-6 px-5 text-white flex flex-col items-center sm:items-start text-justify min-h-screen w-full xl:min-w-[1150px] lg:max-w-[1150px]">
          {
            doctrines &&
            <div className="w-full">
              <div className="w-full">
                <h1 className="text-4xl relative">{ doctrines.name }</h1>
                <hr className="w-full my-6" />
              </div>
              <div className="grid grid-cols-1 gap-2">
                {
                  doctrines.doctrines.map((doct: IListDoctrines, index: number) => (
                    <LevelDoctrine key={ index } doct={ doct } />
                  ))
                }
              </div>
              {
                showDetails && doctrines.apName !== ''
                ? <div className="border-2 border-white p-4 mt-2 w-full">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={ () => setShowDetails(!showDetails) }>
                    <div className="font-bold text-xl">
                      { doctrines.apName }
                    </div>
                    <IoIosArrowUp />
                  </div>
                  <div className="p-3">
                    <div className="pt-3">
                      <div className="font-bold mb-1">
                        Forma Apocalíptica sem Tormento:
                      </div>
                      <hr className="w-full mb-2" />
                      <div>{ doctrines.apWithoutTorment }</div>
                    </div>
                    <div>
                      {
                        doctrines.apocalypticForm
                          .filter((apForm: IListApocaliptycForm) => apForm.torment)
                          .map((apForm: IListApocaliptycForm, index: number) => (
                          <div key={ index } className="pt-2">
                            <span className="font-bold">{ apForm.name }: </span>{ apForm.description }
                          </div>
                        ))
                      }
                    </div>
                    <div className="pt-3">
                      <div className="font-bold mb-1">
                        Forma Apocalíptica com Tormento:
                      </div>
                      <hr className="w-full mb-2" />
                      <div>{ doctrines.apWithTorment }</div>
                    </div>
                    <div>
                      {
                        doctrines.apocalypticForm
                          .filter((apForm: IListApocaliptycForm) => !apForm.torment)
                          .map((apForm: IListApocaliptycForm, index: number) => (
                          <div key={ index } className="pt-2">
                            <span className="font-bold">{ apForm.name }: </span>{ apForm.description }
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                : 
                  <div>
                    {
                      doctrines.apName ?
                      <div
                        className="border-2 border-white p-4 mt-2 w-full flex items-center justify-between cursor-pointer"
                        onClick={ () => setShowDetails(!showDetails) }
                      >
                        <div className="font-bold text-xl">
                          { doctrines.apName }
                        </div>
                        <IoIosArrowDown />
                      </div>
                      : <div />
                    }
                  </div>
              }
            </div>
          }
        </div>
      </section>
      <Footer />
    </div>
  )
}