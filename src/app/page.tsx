'use client'
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useRef } from 'react';

export default function Home() {
  const describe = useRef<HTMLDivElement | null>(null);

  const scrollToComponent = () => {
    if (describe.current) describe.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-black flex flex-col items-center justify-center relative">
      <header className="h-screen w-full flex flex-col items-center justify-center bg-cover relative bg-[url('/images/wallpapers/006.png')] bg-top">
        <div className={`absolute w-full h-full bg-black/70`} />
        <div className="h-screen w-full z-10 flex flex-col justify-center items-center">
          <Image
            src="/images/logos/text2.png"
            alt="Nome 'Werewolf the Apocalypse' em formato de imagem"
            className="h-[40vh] sm:h-[60vh] md:h-[40vh] w-10/12 sm:w-3/5 md:w-1/2 xl:w-5/12 object-contain sm:mt-40"
            width={2000}
            height={800}
            priority
          />
          <Image
            src="/images/logos/arrow-down.png"
            alt="seta para baixo"
            className="sm:h-[30vh] w-20 object-contain animate-pulse cursor-pointer"
            width={2000}
            height={800}
            priority
            onClick={scrollToComponent}
          />
        </div>
      </header>
      <div ref={ describe } className="grid grid-cols-2 sm:grid-cols-8 w-full h-full px-4 sm:px-8 pb-4 gap-4 sm:gap-6">
        <div
          className={`sm:text-3xl bg-[url('/images/wallpapers/05.png')] mt-4 sm:mt-8 bg-cover bg-top col-span-2 sm:col-span-8 sm:row-span-1 text-center text-white flex relative border-transparent items-end`}>
          <div className={`absolute w-full h-full bg-black/40`} />
          <p className="py-14 p-5 z-10 relative">
            {/* Seja bem-vindo a uma jornada marcada por ecos da Criação e do Abismo, onde você poderá desvendar os segredos dos Anjos Caídos, seus Pactos, Facções e Tormentos em Demônio: a Queda. */}
          </p>
        </div>
        <Link href="/factions" className="col-span-1 sm:col-span-2 sm:row-span-2">
          <div
            className={`bg-[url('/images/wallpapers/02.png')] bg-cover bg-center h-full sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2 relative">Facções</p>
          </div>
        </Link>
        <Link href="/doctrines" className="col-span-1 sm:col-span-2 sm:row-span-4">
          <div
            className={`bg-[url('/images/wallpapers/03.png')] bg-center bg-cover h-[20vh] sm:h-full text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Doutrinas</p>
          </div>
        </Link>
        <Link href="/sessions" className="col-span-2 sm:col-span-4 sm:row-span-2">
          <div
            className={`bg-[url('/images/wallpapers/07.png')] bg-cover bg-top h-[20vh] sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Sessões</p>
          </div>
        </Link>
        <Link href="/houses" className="col-span-1 sm:col-span-2 sm:row-span-2">
          <div
            className={`bg-[url('/images/wallpapers/04.png')] bg-cover h-[20vh] sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2 relative">Casas</p>
          </div>
        </Link>
        <Link href="/backgrounds" className="col-span-1 row-span-2 sm:col-span-2 sm:row-span-2">
          <div
            className={`bg-[url('/images/wallpapers/01.png')] bg-cover bg-bottom h-full sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Antecedentes</p>
          </div>
        </Link>
        <Link href="/profile" className="col-span-1 sm:row-span-2 sm:col-span-2">
          <div
            className={`bg-[url('/images/wallpapers/08.png')] bg-cover bg-bottom h-[20vh] sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Perfil</p>
          </div>
        </Link>
        {/* <Link href="/sessions" className="col-span-2 sm:row-span-2 sm:col-span-3">
          <div
            className={`bg-[url('/images/wallpapers/01.jpg')] bg-cover bg-center h-[20vh] sm:h-full text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Sessões</p>
          </div>
        </Link>
        <Link href="/talismans" className="col-span-1 row-span-3 sm:row-span-2 sm:col-span-3">
          <div
            className={`bg-[url('/images/wallpapers/01.jpg')] bg-cover bg-center h-[60vh] sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Talismãs</p>
          </div>
        </Link>
        <Link href="/loresheets" className="col-span-1 row-span-1 sm:row-span-2 sm:col-span-2">
          <div
            className={`bg-[url('/images/wallpapers/01.jpg')] bg-cover h-full sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-fullbg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Loresheets</p>
          </div>
        </Link>
        <Link href="/advantagesAndFlaws" className="col-span-1 row-span-1 sm:col-span-4 sm:row-span-4">
          <div
            className={`bg-[url('/images/wallpapers/01.jpg')] bg-top bg-cover h-full sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Vantagens e Defeitos</p>
          </div>
        </Link>
        <Link href="/profile" className="col-span-1 row-span-1 sm:col-span-4 sm:row-span-4">
          <div
            className={`bg-[url('/images/wallpapers/01.jpg')] bg-top bg-cover h-full sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Perfil</p>
          </div>
        </Link> */}
      </div>
      <button
        type="button"
        className={`pb-3bg-white text-black p-2 font-bold mt-3'}`}
        
      >
        Enviar Feedback
      </button>
      <Footer />
    </main>
  );
}