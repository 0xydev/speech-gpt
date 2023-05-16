import { motion } from "framer-motion";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "~/components/Header";
import Mic from "../../public/Mic.svg";
import Message from "../components/Message";
import axios from "axios";
import Spinner from "../../public/spinner.svg";

const Home: NextPage = () => {
  const scrollTo = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [ht, setHt] = useState<string[]>();
  const chunks: Blob[] = [];
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    scrollTo.current?.scrollIntoView();
    getMessageHistory("1", "1").then(() => {
      setLoaded(true);
    });

    /* 
    @getMessageHistory function takes 2 parameter => userId & charId
    Related to current user, provide the userId. And charId for each character.

    sample arguments =>    1,1               1,2             1,3
                      userId/charId     userId/charId   userId/charId
    */
  }, []);

  const getMessageHistory = async (userId: string, charId: string) => {
    try {
      const history = await axios.post("/api/message/get", {
        userId: userId,
        charId: charId,
      });
      setHt(history.data);
      /*console.log(ht);*/
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    setMessage(e.value);
  };

  const record = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);

          if (mediaRecorder.state == "recording") return;
          mediaRecorder.start();

          setTimeout(() => {
            mediaRecorder.stop();
          }, 5000);

          mediaRecorder.onstop = async (e) => {
            const buffer = new Blob(chunks, { type: "audio/mp3; codecs=opus" });

            let base64: any = "";
            var reader = new window.FileReader();
            reader.readAsDataURL(buffer);
            reader.onloadend = async () => {
              base64 = reader.result;
              base64 = (base64 as string).split(",")[1];

              await fetch("/api/stt", {
                method: "POST",
                body: JSON.stringify({ content: base64 }),
              })
                .then((res) => res.json())
                .then((json) => {
                  const transcript =
                    json.transcript[0].toUpperCase() + json.transcript.slice(1);
                  setMessage(transcript);
                });
            };
          };

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };
        })
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between gap-y-10 bg-gradient-to-b from-sky-200 to-sky-50 px-20 pt-10 lg:px-44">
      <Head>
        <title>Konuşa Konuşa</title>
        <meta name="description" content="Havalı yapay kişiliklerle konuş" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="top-0 flex items-center justify-between">
        <motion.div
          transition={{ delay: 0.15 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-1/2"
        >
          <Image
            src="/Placeholder.png"
            alt="Placeholder"
            width={600}
            height={600}
            className="h-full"
          />
        </motion.div>
        <div className="flex h-[700px] w-1/2 flex-col gap-y-8">
          <div
            className="flex transform-gpu flex-col gap-y-8 overflow-y-scroll px-14"
            id="scrollbar-hide"
          >
            {loaded ? (
              ht?.map((e) => (
                <>
                  <Message type={0} message={e.message} />
                  <Message type={1} message={e.response} />
                </>
              ))
            ) : (
              <div className="grid h-screen place-items-center">
                <Image src={Spinner} alt={"Spinner"} width={48} height={48} />
              </div>
            )}
          </div>

          <div className="mx-auto flex w-3/4 items-center justify-center gap-x-4">
            <Image
              src={Mic}
              alt="Mic"
              onClick={record}
              className="h-10 w-10 cursor-pointer"
            />
            <input
              type="text"
              value={message}
              onChange={(e) => handleInput(e)}
              placeholder="Enter your message"
              className="w-full rounded-full px-5 py-4 text-xl text-sky-900"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
