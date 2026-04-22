import { Link } from "@tanstack/react-router";
import Button from "../components/button";
import Logo from "../components/logo";

export default function GuestPage(){

  return(
    <div className="h-screen min-h-fit w-screen bg-[#fbf2dd93] relative">
      <GuestNavbar />
      <div className="border-t border-b w-screen h-[85%] flex text-[rgba(0,0,0,0.8)] overflow-y-scroll scrollbar-hidden absolute top-[7.5%]">

        <div className="border w-[65%] h-full min-h-fit flex flex-col justify-center items-center font-lora">
          <div className="w-[80%] h-[70%] min-h-fit pl-6  flex flex-col justify-center items-start">
            <span className="text-8xl text-[rgba(0,0,0,0.8)] " >
              Human
            </span>
            <span className="text-8xl " >
              stories & ideas
            </span>
            <p className="text-xl my-6">A place to read, write, and deepen your understanding</p>
            <button className={`border rounded-full my-4 py-2 px-4 bg-black text-center text-lg text-white w-45 min-w-26 cursor-pointer`}> Start reading</button>
          </div>
        </div>

        <div className="border w-[35%] h-full bg-[url(guestlogo.png)] bg-contain bg-no-repeat"></div>
      </div>
      <Footer />
    </div>
  )
}


function GuestNavbar(){
  let options = [
    {
      text: 'Our story',
      url: '/story'
    },
    {
      text: 'Membership',
      url: ''
    },
    {
      text: 'Write',
      url: '/write'
    },
    {
      text: 'Sign in',
      url: '/signin'
    }
  ]


  return(
    <div className="border h-[7.5%] w-screen flex justify-center items-center absolute">
      <div className=" h-full w-[90%] flex justify-between items-center">

        <div className=" h-[90%] w-[15%] flex justify-center items-center">
          <Logo />
        </div>

        <div className=" h-[90%] w-[40%] flex justify-around items-center">
          {
            options.map((option, index) => {
              return <Link key={index} to={option.url} className=" p-1 text-sm cursor-pointer font-lora">{option.text}</Link>
            })
          }
          <Button text="Get Started" />
        </div>
      </div>
    </div>
  )
}


function Footer(){
  let footerLinks = [
    {
      text: 'Help',
      url: ""
    },
    {
      text: 'Status',
      url: ""
    },
    {
      text: 'About',
      url: ""
    },
    {
      text: 'Careers',
      url: ""
    },
    {
      text: 'Press',
      url: ""
    },
    {
      text: 'Blog',
      url: ""
    },
    {
      text: 'Privacy',
      url: ""
    },
    {
      text: 'Rules',
      url: ""
    },
    {
      text: 'Terms',
      url: ""
    },
    {
      text: 'Text to speech',
      url: ""
    },

  ];
  return (
    <div className="h-[7.5%] w-full text-small flex justify-center items-center text-gray-700 absolute bottom-0">
      <div className="flex justify-around">
        {
          footerLinks.map((link, index) => {
            return (
              <Link key={index} to={link.url} className="mx-2.5 cursor-pointer text-sm">{link.text}</Link> 
            )
          })
        }
      </div>
      
    </div>
  )
}