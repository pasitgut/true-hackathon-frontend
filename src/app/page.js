import Image from "next/image";
import CarouselSection from "@/components/CarouselSection";
import ImageSlider from "@/components/ImagesSlider";
import ServicesMenu from "@/components/ServicesMenu";
import AnimatedStatsComponent from "@/components/AnimatedStatsComponent";
// export default function Home() {
//   return (
//     <>
// <CarouselSection />
//         <div className="flex h-[100px] bg-green-500 mt-2"></div>
//         <div className="flex flex-rows justify-between mx-8 my-6 bg-[#A0A0A0] p-4 rounded-3xl text-white">
//           <h2>Start Here</h2>
//           <h2>Arrow Icon</h2>
//         </div>
//   <div className="flex h-[150px] bg-blue-500 mt-2 mx-2 rounded-lg"> </div>
//   </>
//   );
// }


export default function Home() {
  return (
    <>
    <ImageSlider/>
        <div className="m-2"><AnimatedStatsComponent/></div>
        {/* <AnimatedStatsComponent/> */}
          <div className="p-7 mt-[-40]">
            <button className="w-full max-w-sm mx-auto bg-[#ED282E] text-white font-medium px-6 py-3 rounded-full flex items-center justify-between group hover:bg-[#d1242a] transition-colors">
              <span className="flex-1 text-left">
                เริ่มต้น
              </span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="ml-2 group-hover:translate-x-1 transition-transform"
              >
                <path 
                  d="M9 18L15 12L9 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="mt-[-15]"><ServicesMenu/></div></>
  )
}
