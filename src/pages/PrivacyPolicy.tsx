import Seo from "../components/Seo";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy — AIScripto Enterprise Data Protection"
        description="Read AIScripto's privacy policy. Learn how we collect, use and protect your data."
      />
    <div className="pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-up [animation-duration:0.5s]">
          <h1 className="text-h1 font-bold mb-6">Privacy <span className="text-gradient">Policy</span></h1>
          <p className="text-muted-foreground mb-6">Last updated: March 04, 2026</p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to AIScripto. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. The Data We Collect</h2>
              <p className="text-muted-foreground">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Identity Data includes first name, last name, username or similar identifier.</li>
                <li>Contact Data includes email address and telephone numbers.</li>
                <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                <li>Usage Data includes information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
              <p className="text-muted-foreground">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Legal Rights</h2>
              <p className="text-muted-foreground">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
);
}
