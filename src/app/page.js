import ImageSlider from "@/components/ImagesSlider";
import ServicesMenu from "@/components/ServicesMenu";
import AnimatedStatsComponent from "@/components/AnimatedStatsComponent";
import Link from "next/link";



export default function Home() {
  return (
    <>
    <ImageSlider/>
        <div className="m-2"><AnimatedStatsComponent/></div>
        {/* <AnimatedStatsComponent/> */}
          <div className="p-7 mt-[-40]">

              <Link href="/login" className="w-full max-w-sm mx-auto bg-[#ED282E] text-white font-medium px-6 py-3 rounded-full flex items-center justify-between group hover:bg-[#d1242a] transition-colors">
              <span className="flex-1 text-left">
                เริ่มต้น เข้าสู่ระบบ 
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
              </Link>
          </div>
          <div className="mt-[-15]"><ServicesMenu/></div></>
  )
}
