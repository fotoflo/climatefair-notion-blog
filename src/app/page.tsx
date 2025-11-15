import Image from "next/image";
import Link from "next/link";
import RecentPosts from "@/components/recent-posts";

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section with Header Collage */}
      <section className="relative text-center space-y-8 py-16">
        {/* Header Collage - placeholder for user's image */}
        <div className="relative w-full aspect-video max-w-6xl mx-auto mb-12 rounded-2xl overflow-hidden bg-muted">
          <Image
            src="/banner.png"
            alt="ClimateFair Community"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
          Welcome to the
          <br />
          <span className="text-flexbike-teal">ClimateFair Community</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A vibrant community of climate entrepreneurs, investors, and
          changemakers working together to build a sustainable future across
          Asia-Pacific. Join us in accelerating climate action through
          collaboration, innovation, and shared purpose.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/services"
            className="bg-flexbike-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-flexbike-teal/90 transition-colors"
          >
            Explore Our Services
          </Link>
          <Link
            href="/blog"
            className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Read Our Stories
          </Link>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="space-y-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Community Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Together, we're building a network of climate leaders driving real
            change
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <div className="text-4xl md:text-5xl font-bold text-flexbike-teal mb-2">
              20+
            </div>
            <div className="text-muted-foreground">
              Active Community Members
            </div>
          </div>
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <div className="text-4xl md:text-5xl font-bold text-flexbike-teal mb-2">
              5
            </div>
            <div className="text-muted-foreground">
              Climate Businesses Supported
            </div>
          </div>
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <div className="text-4xl md:text-5xl font-bold text-flexbike-teal mb-2">
              $1.1M+
            </div>
            <div className="text-muted-foreground">Community Funds Raised</div>
          </div>
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <div className="text-4xl md:text-5xl font-bold text-flexbike-teal mb-2">
              30+
            </div>
            <div className="text-muted-foreground">Community Investors</div>
          </div>
        </div>
      </section>

      {/* Charts Section - placeholder for user's charts */}
      <section className="space-y-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Climate Opportunity
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the scale and impact of climate action in Asia-Pacific
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Chart 1 - placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/co2-emissiosn-by-region.png"
              alt="Climate Impact Chart"
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Chart 2 - placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/fragmentation-by-sector.png"
              alt="Climate Solutions Chart"
              fill
              className="object-contain p-4"
            />
          </div>
        </div>
      </section>

      {/* Event Photos Section - placeholder for user's event photos */}
      <section className="space-y-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Community Events & Gatherings
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See our community in action at events, workshops, and networking
            sessions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Event photo placeholders - user will provide paths */}
          {[
            "/story-1.jpg",
            "/story-2.jpg",
            "/story-3.jpg",
            "/story-4.jpg",
            "/story-5.jpg",
          ].map((src, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden bg-muted"
            >
              <Image
                src={src}
                alt={`Community event ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-muted/30 rounded-3xl p-8 md:p-16 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Makes Our Community Special
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            ClimateFair is more than a platform—it's a community of passionate
            individuals and organizations united by a shared vision:
            accelerating climate action across Asia-Pacific. We bring together
            entrepreneurs, investors, and experts who are committed to building
            a sustainable future.
          </p>
          <p className="text-lg text-foreground font-semibold">
            Through regular events, knowledge sharing, and collaborative
            projects, we create opportunities for meaningful connections and
            collective impact. Our community members support each other, share
            resources, and work together to scale climate solutions that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-background rounded-xl p-6">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Collaborative Network
            </h3>
            <p className="text-muted-foreground">
              Connect with like-minded climate leaders and build lasting
              partnerships
            </p>
          </div>
          <div className="bg-background rounded-xl p-6">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Knowledge Sharing
            </h3>
            <p className="text-muted-foreground">
              Learn from experts and share insights through workshops and events
            </p>
          </div>
          <div className="bg-background rounded-xl p-6">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Collective Impact
            </h3>
            <p className="text-muted-foreground">
              Amplify your climate initiatives through community support and
              resources
            </p>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <RecentPosts />

      {/* Join Community CTA */}
      <section className="text-center space-y-8 py-16 bg-muted/30 rounded-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Join the ClimateFair Community
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Whether you're a climate entrepreneur, investor, or simply passionate
          about sustainability, there's a place for you in our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="mailto:team@climatefair.co"
            className="bg-flexbike-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-flexbike-teal/90 transition-colors"
          >
            Get in Touch
          </Link>
          <Link
            href="/services"
            className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Learn About Our Services
          </Link>
        </div>
      </section>
    </div>
  );
}
