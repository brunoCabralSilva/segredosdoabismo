'use client'
import Image from "next/image";
import React from 'react';

export default function Footer() {
  return (
    <footer className={`relative text-white px-8 flex flex-col sm:flex-row justify-between items-center w-full py-2 z-5 bg-black`}>
      <div className="pl-0 sm:w-1/4 flex flex-row justify-center sm:justify-start p-2 my-4 sm:my-0">
        <Image
          src="/images/logos/Garou Nordeste.png"
          alt="Logo do Garou Nordeste"
          width={1000}
          height={800}
          className="w-12 mr-3 object-contain"
        />
        <Image
          src="/images/logos/icon.webp"
          alt="Logo do World of Darkness"
          width={1000}
          height={800}
          className="w-12"
        />
      </div>
      <div className="sm:w-3/4 text-sm">
        <p className="text-center sm:text-right w-full">© Paradox Interactive. Trademarks belong to their respective owners. All rights reserved.</p>
        <p
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`pt-3 pb-2 sm:py-0 text-center sm:text-right w-full cursor-pointer hover:text-orange-600 text-orange-400 transition-colors duration-700`}
        >
          Retornar ao Topo
        </p>
      </div>
    </footer>
  );
}