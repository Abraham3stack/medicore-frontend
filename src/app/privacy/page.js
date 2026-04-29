export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-surface">
      <section className="px-6 py-16 md:py-20 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-textSecondary max-w-2xl mx-auto">
            Your data privacy and security are important to us. Here’s how Medicore handles your information.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Card 1 */}
          <div id="data-collection" className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>📥</span> Data Collection
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              We collect only the necessary information required to provide and improve our services, such as account details and usage data.
            </p>
          </div>

          {/* Card 2 */}
          <div id="data-usage" className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>⚙️</span> Data Usage
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              Your data is used solely to enhance your experience, manage healthcare workflows, and ensure seamless platform functionality.
            </p>
          </div>

          {/* Card 3 */}
          <div id="data-protection" className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>🔒</span> Data Protection
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              We implement modern security measures, including encryption and authentication systems, to keep your information safe.
            </p>
          </div>

          {/* Card 4 */}
          <div id="user-control" className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>👤</span> User Control
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              You have full control over your data, including the ability to update or delete your information at any time.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}