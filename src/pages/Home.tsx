import Seo from '../components/Seo';
import HomeHero from '../components/home/HomeHero';
import HomeTrustBar from '../components/home/HomeTrustBar';
import ProProductCarousel from '../components/home/ProProductCarousel';
import HomePractices from '../components/home/HomePractices';
import HomeCaseStudies from '../components/home/HomeCaseStudies';
import HomeSecurityCompliance from '../components/home/HomeSecurityCompliance';
import EnterpriseCta from '../components/EnterpriseCta';

/**
 * Home page (content plan, Nov 2026):
 * 1. Hero: keyword H1 + plain promise          2. Technology logo strip
 * 3. Products carousel                          4. Services: six linked tiles + popular solutions
 * 5. Selected work: three case studies (proof)  6. Why AIScripto: four trust points
 * 7. Closing call to action
 * Detail lives on the product, service and case-study pages; Home summarises and links.
 */
export default function Home() {
  return (
    <>
      <Seo
        title="Enterprise AI Solutions & Software Development Company"
        description="AIScripto is an enterprise AI solutions and software development company building AI agents, voice receptionists, ERP integrations, cloud platforms and POS."
      />

      <HomeHero />
      <HomeTrustBar />
      <ProProductCarousel />
      <HomePractices />
      <HomeCaseStudies />
      <HomeSecurityCompliance />
      <EnterpriseCta
        variant="full"
        heading="Ready to start your AI project?"
        description="Tell us what slows your team down. A solutions architect will review it, suggest an approach and give you an honest estimate."
        trustPoints={["Reply within one business day", "Mutual NDA on request"]}
      />
    </>
  );
}
