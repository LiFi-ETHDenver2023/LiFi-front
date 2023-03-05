import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import React, { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';

import BorderButton from '../components/BorderButton';
import BottomNavigation from '../components/BottomNavigation';
import BottomSheet from '../components/BottomSheet';
import Challenges from '../components/Challenges';
import CreateChallenge from '../components/CreateChallenge';
import DefaultLayout from '../components/DefaultLayout';
import Header from '../components/Header';
import Stories from '../components/Stories';
import { Web3AuthContext, Web3AuthProviderContext } from '../context/Web3AuthContext';
import { Challenge } from '../entity/challenge';
import { User } from '../entity/user';
import Logo from '../public/svg/lifi_logo.svg';
import { connectMetamask } from '../util/connectWallet';
interface Props {
  challenges: Challenge[];
  users: User[];
}

export default function HomeTemplate({ challenges, users }: Props) {
  const [connected, setConnected] = useState(false);
  // const { web3auth, setWeb3auth } = React.useContext(Web3AuthContext);
  // const { provider, setProvider } = React.useContext(Web3AuthProviderContext);

  const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;

  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<any | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: 'testnet', // mainnet, aqua, celeste, cyan or testnet
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x13881',
            rpcTarget: 'https://rpc-mumbai.maticvigil.com', // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const handleWalletConnect = async () => {
    const address = await connectMetamask();
    if (address) {
      setConnected(true);
      sessionStorage.setItem('wallet_address', address);
    }
  };

  const login = async () => {
    if (!web3auth) {
      alert('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    console.log('web3authProvider', web3authProvider);
    if (web3authProvider) {
      setConnected(true);
    }
    setProvider(web3authProvider);
  };

  const logout = async () => {
    if (!web3auth) {
      alert('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  return (
    <DefaultLayout>
      {connected ? (
        <>
          <Header />
          <Stories users={users} />
          <Challenges
            challenges={challenges.filter((obj) => obj.type === 'develop')}
            title="Develop 🧑‍💻"
          />
          <Challenges
            challenges={challenges.filter((obj) => obj.type === 'excercise')}
            title="Excercise 🏃‍♀️"
          />
          <Challenges challenges={challenges.filter((obj) => obj.type === 'art')} title="Art 👩‍🎨" />
          <CreateChallenge />
          <BottomNavigation />
        </>
      ) : (
        <>
          <WelcomeConatiner></WelcomeConatiner>
          <BottomSheet>
            <RegistrationContainer>
              <SmallLogo onClick={logout} />
              <div className="title">
                You are the sum of your life events.
                <br />
                Record your moments with LiFi.
              </div>
              <div className="button-container">
                <BorderButton
                  onClick={login}
                  buttonColor="rgba(55, 51, 255, 1)"
                  width={308}
                  height={51}
                  margin="31px 0 18px"
                  textSize={16}
                >
                  Continue with Email (web3auth)
                </BorderButton>
              </div>
            </RegistrationContainer>
          </BottomSheet>
        </>
      )}
    </DefaultLayout>
  );
}

const WelcomeConatiner = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url('/img/aaa.gif');
  background-size: cover;
  background-position: center;
`;

const RegistrationContainer = styled.div`
  padding: 16px 24px 0;

  .title {
    font-family: InterTight;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    padding: 12px 0 0;
  }

  .button-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0px;
  }

  .login {
    width: 312px;
    height: 48px;
    background: #e4e4e4;
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: InterTight;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }
`;

const SmallLogo = styled(Logo)`
  width: 69px;
  height: 24px;
  margin-bottom: 10px;
`;
