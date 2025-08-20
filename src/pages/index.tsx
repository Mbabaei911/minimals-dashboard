import Navbar from "@/components/navbar/navbar";
import WelcomeBanner from "@/components/introSection/welcomeBanner";
import { ChartSection } from "@/components/chartSection/chartSection";
export default function Home() {
  return (
    <div className="">
      <Navbar />

      <WelcomeBanner />
      <ChartSection />
    </div>
  );
}
