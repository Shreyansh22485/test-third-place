import DoubleDownArrow from "../components/DoubleDownArrow";
import FindTribe from "../components/FindTribe";
import JoinNowDiv from "../components/FirstButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import StepCarousel from "../components/HowITWorks";
import NewsSection from "../components/NewsSection";
import PickVibe from "../components/PickVibe";
import WhyNeed from "../components/WhyNeed";


export default function Home() {
  return (
      <div>
               <div className="sticky top-0 z-50 ">
                        <Header/>
               </div>

                <div>
                       <HeroSection/>
                </div>  
                    
                 <div>
                       < DoubleDownArrow />
                  </div>
                   <div>
                        <WhyNeed/>
                   </div>

                   <div>
                          <NewsSection/>
                   </div>

                    <div>
                         <StepCarousel/>
                    </div>
                    <div>
                      <PickVibe/>
                    </div>

                    <div>
                      <FindTribe/>
                    </div>
                    <div>
                      <Footer/>
                    </div>
              

      </div>
  );
}


