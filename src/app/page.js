import Image from "next/image";
import CarouselSection from "@/components/CarouselSection";

export default function Home() {
  return (
    <>
<CarouselSection />
        <div className="flex h-[100px] bg-green-500 mt-2"></div>
        <div className="flex flex-rows justify-between mx-8 my-6 bg-[#A0A0A0] p-4 rounded-3xl text-white">
          <h2>Start Here</h2>
          <h2>Arrow Icon</h2>
        </div>
  <div className="flex h-[150px] bg-blue-500 mt-2 mx-2 rounded-lg"> </div>
  </>
  );
}

