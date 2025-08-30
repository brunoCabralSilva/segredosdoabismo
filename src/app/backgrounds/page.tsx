"use client"

import Footer from "@/components/footer"
import Nav from "@/components/nav"

export default function Backgrounds() {
  return(
    <div className="w-full bg-[] bg-cover bg-top relative">
    <Nav />
    <div className="absolute w-full h-full bg-black/80" />
    <section className="mb-2 min-h-screen relative pb-5">
    <div className="py-6 px-5 bg-black/90 text-white flex flex-col items-center sm:items-start text-justify">
        <h1 className="text-4xl relative">Antecedentes</h1>
        <hr className="w-10/12 my-6" />
        <p className="pb-2">
        
        </p>
    </div>
    </section>
    <Footer />
</div>
  )
}