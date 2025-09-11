"use client"

import Footer from "@/components/footer"
import Nav from "@/components/nav"

export default function Backgrounds() {
  return(
    <div className="w-full bg-[url('/images/wallpapers/01.png')] bg-top bg-cover relative">
      <Nav />
      <div className="absolute w-full h-full" />
      <section className="min-h-screen bg-black/90 relative w-full h-full flex flex-col items-center">
        <div className="py-6 px-5  text-white flex flex-col items-center sm:items-start text-justify min-h-screen w-full xl:min-w-[1150px] lg:max-w-[1150px]">
          <div className="px-4 w-full">
            <h1 className="text-4xl relative">Antecedentes</h1>
            <hr className="w-full my-6" />
            <p className="pb-2">
              
            
            </p>
          </div>
        </div>
      </section>
    <Footer />
</div>
  )
}