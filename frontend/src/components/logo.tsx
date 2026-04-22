import { useNavigate } from "@tanstack/react-router";

function Logo (){
  const navigate = useNavigate();
  return (
    <h1 onClick={() => navigate({to:'/'})} className=" text-3xl md:text-2xl font-bold font-lora cursor-pointer">Medium</h1>
  )
}


export default Logo;