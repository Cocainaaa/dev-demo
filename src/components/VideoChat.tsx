import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export const VideoChat: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const ffmpeg = createFFmpeg({ log: true });

  let peer: SimplePeer.Instance | undefined;

  useEffect(() => {
    (async () => {
      await ffmpeg.load();
    })();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        peer = new SimplePeer({ initiator: true, stream });
        peer.on('stream', remoteStream => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      })
      .catch(error => {
        console.error('Error accessing media devices:', error);
      });

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  const startRecording = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream;
    if (!stream) {
      console.error('Unable to access the media stream');
      return;
    }
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.addEventListener('dataavailable', (event: any) => {
      if (event.data.size > 0) {
        setRecordedChunks(prevChunks => [...prevChunks, event.data]);
      }
    });

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      convertToMp4();
    }
  };

  const convertToMp4 = async () => {
    const webmBlob = new Blob(recordedChunks, { type: 'video/webm' });
    const webmDataUrl = URL.createObjectURL(webmBlob);
    ffmpeg.FS('writeFile', 'input.webm', await fetchFile(webmDataUrl));

    await ffmpeg.run('-i', 'input.webm', 'output.mp4');

    const mp4Data = ffmpeg.FS('readFile', 'output.mp4');
    const mp4Blob = new Blob([mp4Data.buffer], { type: 'video/mp4' });

    const url = URL.createObjectURL(mp4Blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enregistrement_${Date.now()}.mp4`;
    a.click();

    setRecordedChunks([]);
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
      <div>
        {isRecording ? (
          <button onClick={stopRecording}>Arrêter l'enregistrement</button>
        ) : (
          <button onClick={startRecording}>Démarrer l'enregistrement</button>
        )}
      </div>
    </div>
  );
};

