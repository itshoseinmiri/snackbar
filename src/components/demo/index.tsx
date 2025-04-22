import Button from "@mui/material/Button";
import videoSRC from "../../assets/demo.mov";
import { useEffect, useRef, useState } from "react";

function Demo() {
  const [visible, setVisible] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!visible) {
      return;
    }

    videoRef?.current?.play();
  }, [visible]);

  return (
    <div>
      <Button onClick={() => setVisible((v) => !v)}>
        {visible ? "Hide" : "Show"} demo
      </Button>
      <br />
      {visible && <video ref={videoRef} src={videoSRC} controls></video>}
    </div>
  );
}

export default Demo;
