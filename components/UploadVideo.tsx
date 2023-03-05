import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Types } from 'aptos';
import styled from 'styled-components';

import { aptosClient } from '../network/aptos';
import HttpClient from '../network/httpClient';
import VideoRepositoryImpl from '../repository/video';
import VideoUseCase from '../usecase/video';
import { base64StringToFile, isVideo } from '../util/file';
import BorderButton from './BorderButton';
import DefaultLayout from './DefaultLayout';
import HeaderNavigation from './HeaderNavigation';
import Video from './Video';
import { incrementCheckpoint } from '../util/signAndTransaction';

export default function UploadVideo() {
  const { signAndSubmitTransaction } = useWallet();

  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const challengeID = router.query.challengeID;
  const hostAddress = router.query.hostAddress;

  useEffect(() => {
    if (!router.query.videoUrl) {
      router.replace('/');
    }
    setPreviewUrl(router.query.videoUrl);
    setFile(base64StringToFile(router.query.videoUrl as string, router.query.fileName as string));
  }, []);

  const handleUpload = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('video', file);

    try {
      const serverResponse = await new VideoUseCase(
        new VideoRepositoryImpl(HttpClient),
      ).uploadVideo(formData, router.query.challengeID as string);
      console.log(serverResponse);

      if (serverResponse) {
        // const response = await incrementCheckpoint();
        // response?.hash && serverResponse && router.push('/video/upload_complete');

        if (confirm('[Web3Auth] Upload the video for certification of the challenge.')) {
          router.push('/video/upload_complete');
        }
      }
    } catch (err) {
      console.error(err);
      alert('Failed to upload video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <UploadContainer>
        <HeaderNavigation height={108} />
        <div className="video-container">
          {previewUrl ? (
            <>
              {isVideo(file) ? (
                <Video url={previewUrl} />
              ) : (
                <ImageWrapper>
                  <Image src={previewUrl} fill alt="" />
                </ImageWrapper>
              )}
            </>
          ) : (
            <>loading</>
          )}
        </div>
        <div className="gradient-background" />
        <ButtonWrapper>
          <BorderButton
            width={303}
            height={40}
            buttonColor="rgba(28, 255, 9, 1)"
            textColor="#000000"
            onClick={handleUpload}
          >
            Upload
          </BorderButton>
        </ButtonWrapper>
      </UploadContainer>
    </DefaultLayout>
  );
}

const UploadContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000000;

  .video-container {
    width: 100%;
    padding-top: 44px;
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 16px 25px 20px;
  }

  .gradient-background {
    z-index: 20;
    position: fixed;
    width: 100%;
    height: 64px;
    bottom: 109px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  background-color: skyblue;
  border-radius: 20px;
  position: relative;
  padding-top: 170.25%;

  img {
    object-fit: contain;
    border-radius: 20px;
  }
`;

const ButtonWrapper = styled.div`
  z-index: 20;
  width: 100%;
  height: 109px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: #000000;
`;
