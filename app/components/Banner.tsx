import Image from "next/image";
import banner from "@/public/banner_paraup.jpg";

const Banner = () => {
  return (
    <div className="w-full h-fit">
      <Image
        src={banner}
        className="w-full md:w-[90vw] xl:w-[80vw]  md:mx-auto  h-auto object-cover"
        alt="Paraglider floating among wide open skies and soft clouds"
      />
    </div>
  );
};

export default Banner;
