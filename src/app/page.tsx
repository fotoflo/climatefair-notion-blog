import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16">
        <div className="flex justify-center mb-8">
          <Image
            src="/Logo.png"
            alt="ClimateFair"
            width={300}
            height={100}
            className="h-16 w-auto"
            priority
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
          ClimateFair
          <br />
          <span className="text-flexbike-teal">
            Climate Business Sourcing, Franchising and Crowd Funding
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Empowering climate businesses through strategic sourcing, franchise
          opportunities, and innovative crowd funding solutions. Building a
          sustainable future, one business at a time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#opportunity"
            className="bg-flexbike-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-flexbike-teal/90 transition-colors"
          >
            Explore the Opportunity
          </Link>
          <Link
            href="#services"
            className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Our Services
          </Link>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section id="opportunity" className="space-y-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Opportunity of the Century
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Climate change is the largest global economic opportunity of this
            century. Every business is a climate business, and all businesses
            will go through decarbonization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Asia-Pacific: The Climate Frontier
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Asia-Pacific is one of the largest climate addressable markets,
              with significant greenhouse gas emissions, a growing population,
              and one of the most heavily impacted regions by climate change.
            </p>
            <div className="bg-muted/50 rounded-xl p-6">
              <div className="text-4xl font-bold text-flexbike-teal mb-2">
                ~5%
              </div>
              <div className="text-lg text-muted-foreground">
                of Southeast Asia GDP by 2030
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Annual opportunity in the green economy
              </div>
            </div>
            <p className="text-muted-foreground">
              Source: Bain & Co., GenZero, Standard Chartered and Temasek -
              Southeast Asia's Green Economy 2024
            </p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/co2-emissiosn-by-region.png"
              alt="CO2 Emissions by Region"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="bg-muted/30 rounded-3xl p-8 md:p-16 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Challenge: Scaling Effective Climate Solutions
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Many climate-first founders are already successful business people
            growing businesses, but they've never raised capital before and need
            training on topics from investor communications to analytics and
            business intelligence systems, to VC deal terms.
          </p>
          <p className="text-lg text-foreground font-semibold">
            We bridge the gap. With international networks of early adopters
            looking for climate-first products, and investors looking for
            climate-first startups, as well as the know-how to reach both
            audiences and scale climate action.
          </p>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-background mt-12">
          <Image
            src="/fragmentation-by-sector.png"
            alt="Fragmentation of Climate Problem by Sector"
            fill
            className="object-contain p-4"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="space-y-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How We Enable Climate Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions for climate businesses at every stage of
            growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Sourcing */}
          <div className="bg-muted/50 rounded-2xl p-8 hover:bg-muted/70 transition-colors">
            <div className="text-5xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Business Sourcing
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Connect with the best climate businesses and opportunities across
              Asia-Pacific. Our network helps you find the right partners,
              suppliers, and investment opportunities in the climate tech space.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>• Access to 100+ climate businesses</li>
              <li>• Regional expertise across Asia-Pacific</li>
              <li>• Verified partners and suppliers</li>
            </ul>
          </div>

          {/* Franchising */}
          <div className="bg-muted/50 rounded-2xl p-8 hover:bg-muted/70 transition-colors">
            <div className="text-5xl mb-6">🌱</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Franchising
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Scale your proven climate business model through our franchising
              program. We help successful climate businesses expand their impact
              by connecting them with passionate franchisees ready to make a
              difference.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>• 50+ active franchise opportunities</li>
              <li>• Proven business models</li>
              <li>• Comprehensive support network</li>
            </ul>
          </div>

          {/* Crowd Funding */}
          <div className="bg-muted/50 rounded-2xl p-8 hover:bg-muted/70 transition-colors">
            <div className="text-5xl mb-6">💰</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Crowd Funding
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Access capital from a community of climate-conscious investors.
              Our crowd funding platform connects ambitious climate startups
              with individuals and organizations committed to building a
              sustainable future.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>• $10M+ funds raised to date</li>
              <li>• 500+ community investors</li>
              <li>• Transparent investment process</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sector Focus */}
      <section className="space-y-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sectors We Focus On
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We focus on sectors with significant GHG emissions and reduction
            opportunities in Asia-Pacific
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { name: "Energy", icon: "⚡", desc: "Asset Light" },
            { name: "Built Environment", icon: "🏗️", desc: "Construction" },
            { name: "Food & Agriculture", icon: "🌾", desc: "Agri-tech" },
            { name: "Logistics & Mobility", icon: "🚚", desc: "Transport" },
            { name: "Nature-Based Solutions", icon: "🌳", desc: "Carbon" },
          ].map((sector) => (
            <div
              key={sector.name}
              className="bg-muted/50 rounded-xl p-6 text-center hover:bg-muted/70 transition-colors"
            >
              <div className="text-4xl mb-3">{sector.icon}</div>
              <h4 className="font-semibold text-foreground mb-1">
                {sector.name}
              </h4>
              <p className="text-sm text-muted-foreground">{sector.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted mt-12">
          <Image
            src="/project-drawdown-solutions.png"
            alt="Project Drawdown Climate Solutions"
            fill
            className="object-contain p-8"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50 rounded-3xl p-8 md:p-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Impact
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-flexbike-teal mb-2">
              5
            </div>
            <div className="text-muted-foreground">Climate Businesses</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-flexbike-teal mb-2">
              1
            </div>
            <div className="text-muted-foreground">Active Franchises</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-flexbike-teal mb-2">
              $1.1M
            </div>
            <div className="text-muted-foreground">Funds Raised</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-flexbike-teal mb-2">
              20
            </div>
            <div className="text-muted-foreground">Community Members</div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Vision
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-relaxed mb-8">
            To enable Asia's world-class climate businesses, while
            future-proofing economies and creating a sustainable economic legacy
            for Asia-Pacific
          </p>
          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            We believe Asia-Pacific will follow in China's footsteps toward
            decarbonization & electrification. The future is here, and it's
            being built by climate businesses across the region.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 py-16 bg-muted/30 rounded-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Ready to Make an Impact?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Whether you're a climate business looking to scale, an investor
          seeking opportunities, or someone passionate about sustainability,
          we're here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="mailto:team@climatefair.co"
            className="bg-flexbike-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-flexbike-teal/90 transition-colors"
          >
            Get in Touch
          </Link>
          <Link
            href="/blog"
            className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Read Our Blog
          </Link>
        </div>
      </section>
    </div>
  );
}
