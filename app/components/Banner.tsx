import Image from "next/image";
import banner from "@/public/banner_paraapp.jpg";

const Banner = () => {
  return (
    <div className="w-full h-fit">
      <Image
        src={banner}
        className="w-full"
        alt="Paraglider floating among wide open skies and soft clouds"
      />
    </div>
  );
};

export default Banner;
