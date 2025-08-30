'use client'
import { useParams } from "next/navigation";

export default function Background() {
  const params = useParams();
  const background = params?.background as string;
  return(
    <div>
      { background }
    </div>
  )
}