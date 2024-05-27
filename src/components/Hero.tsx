import hands from "../assets/hands.png";
import { Button } from "./ui/button";

const Hero = () => {
  
  // const landingpagedata = {
  //   hero: "" // Example of defining 'hero' property
  // };


  return (
    <div className="relative">
      <img
        src={hands}
        className="w-full max-h-[600px] object-cover"
        alt="Hands"
      />
{/* 
{landingpagedata?(<img
        src={landingpagedata.hero}
        className="w-full max-h-[600px] object-cover"
        alt="Hands"
      />):(<img
        src={hands}
        className="w-full max-h-[600px] object-cover"
        alt="Hands"
      />)}
       */}
      <div className="absolute inset-0 bg-customGreen opacity-50"></div>

      <div className="absolute inset-0 flex  items-center pl-20 ">
        <div>
          <p className="text-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider  ">
            Elevate Your Living <br />
            Experience
          </p>

          <div className="container px-0 py-7">
            <span className="text-sm md:text-2xl font-mono inline-block">
              Unlock a world of convenience in your complex <br></br>with
              collaborative services, events and vibrant community chats
            </span>
          </div>

          <Button> Join Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
