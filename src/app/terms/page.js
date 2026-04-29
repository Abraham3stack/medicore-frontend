export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-surface">
      <section className="px-6 py-16 md:py-20 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Terms & Conditions
          </h1>
          <p className="text-textSecondary max-w-2xl mx-auto">
            Please read these terms carefully before using Medicore. By accessing or using the platform, you agree to these terms.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>📜</span> Use of Service
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              Medicore is intended for managing healthcare workflows. Users must use the platform responsibly and comply with applicable laws.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>👤</span> User Responsibilities
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              Users are responsible for maintaining the confidentiality of their accounts and ensuring that all information provided is accurate.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>⚠️</span> Limitations
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              Medicore is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of the platform.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>🔄</span> Updates to Terms
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              We may update these terms from time to time. Continued use of the platform means you accept any changes made.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}