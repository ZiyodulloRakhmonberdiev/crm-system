import process from "../assets/img/process.png";
import styled, { keyframes } from "styled-components";

const anim = keyframes`
 0% { transform: rotate(0deg) }
 100% { transform: rotate(360deg) }
`;
const Image = styled.div`
  animation-name: ${anim};
  animation-duration: 50s;
  animation-iteration-count: infinite;
`;

const InProcess = () => {
  return (
    <center className="bg-white p-8">
      <Image className="max-w-[100px]">
        <img src={process} alt="" />
      </Image>
      <h2 className="mt-4 text-xl">В разработке</h2>
    </center>
  );
};

export default InProcess;
