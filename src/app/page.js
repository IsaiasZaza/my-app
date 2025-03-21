"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";
import GiftList from "@/components/GiftList";
import HoneymoonDonation from "@/components/HoneymoonDonation";
import Menu from "@/components/Menu";
import WeddingComponent from "@/components/WeddingComponent";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <LoadingScreen onFinish={() => setLoading(false)} />
      ) : (
        <>
          <Menu />
          <WeddingComponent />
          <HoneymoonDonation />
          <GiftList />
          <Footer />
        </>
      )}
    </>
  );
}
