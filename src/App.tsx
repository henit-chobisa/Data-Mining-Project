import React from 'react';
// import { toWav } from 'audiobuffer-to-wav';
import { useState } from 'react';
import './App.css';
import TabBar from './Tabs';
import Wave from './Waveline';
// import WaveLine from './Waveline';
import { WaveFile } from 'wavefile';

function App() {
  const [emailSet, setEmailSet] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [ isListening, setIsListening] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>('');
  const [questionTest, setQuestionText] = useState<string>("Tell us, How are you feeling today?");
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setAudioStream(stream);
  };

  async function recordWavData(wavBlob: Blob): Promise<void> {
    const formData = new FormData();
    formData.append('wav_blob', wavBlob, 'audio.wav');
    formData.append('email', email);

    const response = await fetch('http://localhost:9000/process_wav_blob', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to send WAV blob to Flask API: ${response.statusText}`);
    }
  }

  const stopRecording = async () => {
    if (audioStream){

      audioStream.getTracks().forEach(track => track.stop());

      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(audioStream);
      mediaStreamSource.connect(audioContext.destination);

      const audioBuffer = await audioContext.createBuffer(2, 22050*3, 22050)

      const wavefile = new WaveFile();
      wavefile.fromScratch(1, audioContext.sampleRate, '32f', audioBuffer.getChannelData(0));
      const wavBlob = new Blob([wavefile.toBuffer()], { type: 'audio/wav' });
      await recordWavData(wavBlob);
    }
  };

  const questionClickHandler = () => {

    if(isListening){
      setQuestionText("Tell us, How are you feeling today?");
      setIsListening(false);
      stopRecording();
      return;
    }
    startRecording()
    setQuestionText("Listening...");
    setIsListening(true);
  }
  const handleInputKeyDown = (event:React.KeyboardEvent<HTMLElement>) =>
{
    if (event.key === 'Enter'){
      setEmailSet(true)
    }
  }
  return (
    <div className="App">
      {emailSet ? <div className='CenteredBox'>
        <TabBar/>
        <div onClick={questionClickHandler} className='questionText'>{questionTest}</div>
        <Wave frequency={isListening ? 54 : 8}/>
        <div className='introLine'>We take responsiblity to find out what you feel and how you feel by analysing the patterns of your voice and deeply understanding your emotions, getting you covered for a perfect task scheduling environment, Welcome to the future of Task Scheduling</div>
      </div> : 
        <div className={"emailTaker"}> 
          <div className={"emailTitle"}>Enter your email to continue, please 🐳</div>
          <input className={"emailInput"} onKeyDown={handleInputKeyDown} placeholder={"chobisa.henit@gmail.com"} onChange={event => setEmail(event.target.value)}></input>
        </div>}
    </div>
  );
}

export default App;
