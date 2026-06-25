import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Inspiration from '../../components/Inspiration';
import BeautifySpace from '../../components/DiscountPromo';
import BrowseRange from '../../components/BrowseRange';
import HowItWorks from '../../components/HowItWorks';
import MembershipPromo from '../../components/MembershipPromo';
import FAQ from '../../components/FAQ';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Inspiration />
      <BeautifySpace />
      <BrowseRange />
      <MembershipPromo />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
      
    </>
  );
};

export default Home;