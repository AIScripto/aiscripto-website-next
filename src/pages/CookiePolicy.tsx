import Seo from "../components/Seo";

export default function CookiePolicy() {
  return (
    <>
      <Seo
        title="Cookie Policy — AIScripto Tracking & Preferences"
        description="Understand how AIScripto uses cookies, analytical trackers, and session technologies to improve your enterprise browsing experience."
      />
    <div className="pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-up [animation-duration:0.5s]">
          <h1 className="text-h1 font-bold mb-6">Cookie <span className="text-gradient">Policy</span></h1>
          <p className="text-muted-foreground mb-6">Last updated: November 7, 2026</p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p className="text-muted-foreground">
                Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How AIScripto Uses Cookies</h2>
              <p className="text-muted-foreground">
                When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>To enable certain functions of the Service</li>
                <li>To provide analytics</li>
                <li>To store your preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
              <p className="text-muted-foreground">
                We use both session and persistent cookies on the Service and we use different types of cookies to run the Service:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li><strong>Essential cookies:</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
                <li><strong>Preferences cookies:</strong> We may use preferences cookies to remember information that changes the way the Service behaves or looks.</li>
                <li><strong>Analytics cookies:</strong> We use Google Analytics 4 to understand how visitors use the site, so that we can make improvements. Google Analytics 4 sets its own cookies (such as <code>_ga</code> and <code>_ga_*</code>) to distinguish visitors and sessions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Your Choices Regarding Cookies</h2>
              <p className="text-muted-foreground">
                If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
);
}
