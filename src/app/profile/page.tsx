'use client'
import { useContext, useEffect, useState } from 'react';
import Nav from '@/components/nav';
import { useRouter } from "next/navigation";
import { authenticate } from "@/firebase/authenticate";
import Footer from '@/components/footer';
import contexto from '@/context/context';
import { getAllSessionsByFunction } from '@/firebase/sessions';
import MessageToUser from '@/dicesAndMessages/messageToUser';
import { IAuthData } from '@/interfaces';
import Loading from '@/components/loading';

export default function Profile() {
  const [showData, setShowData] = useState(false);
  const [email, setEmail] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [listDmSessions, setListDmSessions] = useState<{id: string, name: string }[]>([]);
  const [listSessions, setListSessions] = useState<{id: string, name: string }[]>([]);
  const router = useRouter();
  const { 
    // dataSession, setDataSession, 
    resetPopups, showMessage, setShowMessage } = useContext(contexto);
  
  useEffect(() => {
    resetPopups();
    setListDmSessions([]);
    setListSessions([]);
    // setDataSession({ show: false, id: '' });

    const profile = async () => {
      const authData: IAuthData | null = await authenticate(setShowMessage);

      if (authData && authData.email && authData.displayName) {
        const { email, displayName } = authData;
        setNameUser(displayName);
        setEmail(email);
        setShowData(true);

        const { list1, list2 } = await getAllSessionsByFunction(email);
        setListSessions(list2);
        setListDmSessions(list1);
      } else router.push('/login');
    };
    profile();
  }, []);

  return (
    <div className="h-screen overflow-y-auto bg-ritual bg-cover bg-top">
      { showMessage.show && <MessageToUser /> }
      <Nav />
      {
        showData
        ? <div className="w-full bg-[url('/images/wallpapers/06.png')] bg-top bg-cover relative">
            <Nav />
            <div className="absolute w-full h-full" />
            <section className="min-h-screen bg-black/90 relative w-full h-full flex flex-col items-center">
              <div className="py-6 px-5  text-white flex flex-col items-center sm:items-start text-justify min-h-screen w-full xl:min-w-[1150px] lg:max-w-[1150px]">
                <div className="px-4 w-full">
                  <h1 className="text-4xl relative">Perfil</h1>
                  <hr className="w-full my-6" />
                  <p className="pb-2">
                    
                  
                  </p>
                </div>
                <div className="w-full p-4 mt-6 mb-2">
                  <p className="w-full text-center sm:text-left">Usuário registrado:</p>
                  <p className="w-full text-center sm:text-left text-white font-bold capitalize">
                    {nameUser}
                  </p>
                  <p className="pt-5 w-full text-center sm:text-left">Email de cadastro:</p>
                  <p className="w-full text-center sm:text-left text-white font-bold">
                  {email} 
                  </p>
                <p className="w-full text-center sm:text-left pt-6 pb-2">
                  {`${listSessions.length > 0 ? 'Sessões em que você é Jogador (clique para ser redirecionado):' : 'Você não possui sessões onde é um jogador.'}`}
                  </p>
                <div className="pt-3 gap-3 w-full grid sm:grid-cols-2 md:grid-cols-5">
                  {
                    listSessions.map((sessions: {id: string, name: string }, index: number) => (
                      <button
                        type="button"
                        key={index}
                        className="text-center border-2 border-white bg-black px-4 py-2 rounded-full capitalize text-white hover:border-red-800"
                        // onClick={ () => setDataSession({ show: true, id: sessions.id }) }
                      >
                        { sessions.name }
                      </button>
                    ))
                  }
                </div>
                <p className="w-full text-center sm:text-left pt-6 pb-2">
                  {`${listDmSessions.length > 0 ? 'Sessões em que você é narrador (clique para ser redirecionado):' : 'Você não possui sessões em que é Narrador.'}`}
                </p>
                <div className="gap-3 w-full grid sm:grid-cols-2 md:grid-cols-3 pt-3">
                  {
                    listDmSessions.map((sessions: {id: string, name: string }, index: number) => (
                      <button
                        type="button"
                        key={index}
                        className="text-center border-2 border-white bg-black px-4 py-2 rounded-full text-white hover:border-red-800 break-all capitalize"
                        // onClick={ () => setDataSession({ show: true, id: sessions.id }) }
                      >
                        { sessions.name }
                      </button>
                    ))
                  }
                </div>
                </div>
              </div>
            </section>
          </div>
        : <div className="bg-black/60 text-white h-[90vh] flex items-center justify-center flex-col">
            <Loading />
          </div>
      }
      <Footer />
      {/* { dataSession.show ? <VerifySession /> : '' } */}
    </div>
  );
}