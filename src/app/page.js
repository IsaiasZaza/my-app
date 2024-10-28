import Footer from "@/components/Footer";
import GiftList from "@/components/GiftList";
import Menu from "@/components/Menu";
import ParallaxSection from "@/components/ParallaxSection";
import WeddingComponent from "@/components/WeddingComponent";

export default function Home() {
  return (
    <>
      <Menu />
      <WeddingComponent />
      <GiftList />
      <Footer />
    </>
  );
}
