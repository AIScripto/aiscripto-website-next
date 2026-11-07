import Seo from "../components/Seo";

export default function TermsOfService() {
  return (
    <>
      <Seo
        title="Terms of Service — AIScripto Legal Agreements"
        description="Review the terms and conditions governing the use of AIScripto website, enterprise software consulting services, and client engagement models."
      />
    <div className="pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-up [animation-duration:0.5s]">
          <h1 className="text-h1 font-bold mb-6">Terms of <span className="text-gradient">Service</span></h1>
          <p className="text-muted-foreground mb-6">Last updated: November 7, 2026</p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using AIScripto's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
              <p className="text-muted-foreground">
                The Service and its original content, features, and functionality are and will remain the exclusive property of AIScripto and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Obligations</h2>
              <p className="text-muted-foreground">
                You agree not to use the Service for any purpose that is prohibited by these Terms. You are responsible for all of your activity in connection with the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall AIScripto, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Changes</h2>
              <p className="text-muted-foreground">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
);
}
