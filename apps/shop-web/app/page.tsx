import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandStory from "@/components/BrandStory";
import Editorial from "@/components/Editorial";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Manifesto />
      <FeaturedProducts />
      <BrandStory />
      <Editorial />
      <Newsletter />
      <Footer />
    </main>
  );
}
