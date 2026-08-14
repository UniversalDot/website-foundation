import { useLayoutEffect, useRef } from 'react'
import bg from "../assets/back6.png";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FallingPurpleDots from './FallingPurpleDots';
gsap.registerPlugin(ScrollTrigger); 

const Parl = () => {

    const bg1 = useRef(null)
    const img_container = useRef(null)
    const img = useRef(null)
    const text1 = useRef(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: bg1.current,
                pin:bg1.current,
                pinSpacing:false,
                start:"top top",
                endTrigger:"",
                end:"bottom bottom"
            });
            gsap.timeline({
                scrollTrigger:{
                    trigger:img_container.current,
                    pin:img_container.current,
                    scrub: 1,
                    start:"0% 0%",
                }
            })
            .to(img.current, { transform: "translateZ(2200px)" })
            .to(text1.current, { y: -800, ease: "power1.out"});            
        })




        return () => ctx.revert();
    },[])

  return (
    <>
    <div className='relative'>
        <div ref={bg1} className='bg z-[-1]'></div>
            <div ref={img_container} className="img-container perspective flex items-center justify-center h-screen w-screen">
                <img ref={img} className='image intro-circle' src={bg} alt=''/>
                <FallingPurpleDots />

               <div ref={text1} className='absolute z-10 flex flex-col items-center justify-center px-4'>
                    <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-[80px] xl:text-[96px] leading-tight text-center text-apple-text'>
                        <span className=" tracking-tight font-apple">UNIVERSALDOT</span>
                    </h1>
               </div>
            </div>
    </div>
    </>
  )
}

export default Parl;
