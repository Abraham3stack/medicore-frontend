"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-surface">
      {/* Content */}
      <section className="px-6 py-16 md:py-20 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            About Medicore
          </h1>
          <p className="text-textSecondary max-w-2xl mx-auto">
            Building smarter healthcare systems with modern technology and intuitive design.
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
              <span>🎯</span> Our Mission
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              Medicore is designed to simplify how hospitals, doctors, and patients interact by providing a centralized system for managing appointments, users, and workflows.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>💡</span> Why Medicore
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              We focus on usability and performance so healthcare professionals can concentrate on delivering quality care while the platform handles operational complexity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>⚙️</span> Technology
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              Built using modern technologies, Medicore emphasizes scalability, security, and a clean user experience across all devices.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border shadow-sm hover:shadow-md transition">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-3">
              <span>🚀</span> Future Vision
            </h3>
            <p className="text-textSecondary leading-relaxed text-sm">
              We aim to expand Medicore into a fully integrated healthcare ecosystem with advanced analytics, communication tools, and smarter automation.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
