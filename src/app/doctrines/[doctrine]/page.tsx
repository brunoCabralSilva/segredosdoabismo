'use client'
import { useParams } from "next/navigation";

export default function Doctrine() {
  const params = useParams();
  const doctrine = params?.doctrine as string;
  return(
    <div>
      { doctrine }
    </div>
  )
}