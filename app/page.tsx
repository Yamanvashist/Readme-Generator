import Header from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero"
import HowItWorks from "@/components/Landing/HowItWorks";
import Features from "@/components/Landing/Features";
import ReadmePreview from "@/components/Landing/ReadmePreview";
import FinalCTA from "@/components/Landing/FinalCTA";
import Footer from "@/components/Landing/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero/>
      <HowItWorks/>
      <Features/>
      <ReadmePreview/>
      <FinalCTA/>
      <Footer/>
    </main>
  );
}
