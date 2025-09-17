'use client'
import { IListDoctrines } from "@/interfaces";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function LevelDoctrine(props: { doct: IListDoctrines }) {
  const { doct } = props;
  const [showDetails, setShowDetails] = useState<boolean>(false);
  if (showDetails)
    return(
      <div className="border-2 border-white p-4">
        <div
          className="cursor-pointer font-bold text-xl mb-2 flex items-center justify-between"
          onClick={ () => setShowDetails(!showDetails) }
        >
          { doct.level } - { doct.name }
          <IoIosArrowUp />
        </div>
        <div className="p-3">
          <div>{ doct.description }</div>
          <div className="pt-2"><span className="font-bold">Sistema: </span>{ doct.system }</div>
          <div className="pt-2"><span className="font-bold">Tormento: </span>{ doct.torment }</div>
        </div>
      </div>
    );
  return (
    <div
      className="border-2 border-white p-4 cursor-pointer flex items-center justify-between"
      onClick={ () => setShowDetails(!showDetails) }
    >
      <div className="font-bold text-xl">{ doct.level } - { doct.name }</div>
      <IoIosArrowDown />
    </div>
  )
}