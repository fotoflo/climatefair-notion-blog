import Image from "next/image";
import Link from "next/link";
import RecentPosts from "@/components/recent-posts";

const climateFairVideoId = "mIywzI2-a0I";
const climateFairVideoUrl = `https://www.youtube.com/embed/${climateFairVideoId}?rel=0&modestbranding=1&playsinline=1`;

const eventPhotos = [
  {
    src: "/climate-fair-1/photos/guests-at-venue.jpg",
    alt: "Guests arriving at ClimateFair #1",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/climate-fair-1/photos/0Y3A4842.jpg",
    alt: "Attendees waving at the camera",
    className: "row-span-2",
  },
  {
    src: "/climate-fair-1/photos/nana-and-lisl.jpg",
    alt: "Community members sharing stories",
    className: "",
  },
  {
    src: "/climate-fair-1/photos/alex-on-bike.jpg",
    alt: "Panel conversation on stage",
    className: "",
  },
  {
    src: "/climate-fair-1/photos/networking.jpeg",
    alt: "Climate builders networking",
    className: "col-span-2",
  },
  {
    src: "/climate-fair-1/photos/pitch.jpg",
    alt: "Founders presenting their solution",
    className: "",
  },
  {
    src: "/climate-fair-1/photos/dinner.jpg",
    alt: "Team celebrating the day",
    className: "",
  },
];

const partnerLogos = [
  {
    src: "/climate-fair-1/logos/Group 1261152916.png",
    alt: "ClimateFair partner logo 1",
  },
  {
    src: "/climate-fair-1/logos/Group 1261152917.png",
    alt: "ClimateFair partner logo 2",
  },
  {
    src: "/climate-fair-1/logos/image 18.png",
    alt: "ClimateFair partner logo 3",
  },
  {
    src: "/climate-fair-1/logos/image 19.png",
    alt: "ClimateFair partner logo 4",
  },
  {
    src: "/climate-fair-1/logos/image 28.png",
    alt: "ClimateFair partner logo 5",
  },
];

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section with Feature Video */}
      <section className="grid gap-12 lg:grid-cols-2 items-center py-16">
        <div className="space-y-6 text-center lg:text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Food. Fun. Climate Action.
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Food. Fun. Climate Action.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Bridging climate founders, customers, and capital. We're building a
            network of climate leaders driving real change through partnership,
            market making, and capital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="#events"
              className="bg-flexbike-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-flexbike-teal/90 transition-colors"
            >
              Explore Events
            </Link>
            <Link
              href="#partners"
              className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Meet the Partners
            </Link>
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <iframe
            src={climateFairVideoUrl}
            title="ClimateFair #1 Highlights"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </section>

      {/* What We Do */}
      <section className="space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Bridging climate founders, customers, and capital across
            Asia-Pacific.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-muted/40 rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Entrepreneurship
            </h3>
            <p className="text-muted-foreground">
              Helping climate businesses enter markets, franchise, and connect
              with real customers across Asia-Pacific.
            </p>
          </div>
          <div className="bg-muted/40 rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Community
            </h3>
            <p className="text-muted-foreground">
              Events, storytelling, and partnerships that amplify climate action
              and support founders.
            </p>
          </div>
          <div className="bg-muted/40 rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Capital</h3>
            <p className="text-muted-foreground">
              Crowd funding and investor matching that fuel climate ventures at
              every stage.
            </p>
          </div>
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
            change.
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

      {/* Charts Section */}
      <section className="space-y-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Climate Opportunity
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the scale and impact of climate action in
            Asia-Pacific.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/co2-emissiosn-by-region.png"
              alt="Climate impact by region chart"
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/fragmentation-by-sector.png"
              alt="Fragmentation of climate solutions by sector"
              fill
              className="object-contain p-4"
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="space-y-10">
        <div className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Events
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            ClimateFair in Motion
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real smiles, candid waves, and tangible momentum captured during our
            flagship gathering.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[220px]">
          {eventPhotos.map((photo, index) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-2xl shadow-lg border border-border/40 ${
                photo.className || ""
              } ${index % 2 === 0 ? "md:translate-y-2" : "md:-translate-y-2"}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="space-y-8">
        <div className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Partners
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Powered by the ClimateFair Network
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We collaborate with climate-first organizations, investors, and
            ecosystem builders who share our mission.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {partnerLogos.map((logo) => (
            <div
              key={logo.src}
              className="h-16 md:h-20 w-40 md:w-48 flex items-center justify-center px-4 py-2 rounded-2xl bg-muted/40 border border-border/30"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={64}
                className="object-contain max-h-16"
              />
            </div>
          ))}
        </div>
      </section>

      {/* What Makes Our Community Special */}
      <section className="bg-muted/30 rounded-3xl p-8 md:p-16 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What Makes Our Community Special
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            ClimateFair is a community of passionate builders united by a shared
            vision: accelerating climate action across Asia-Pacific. Through
            regular events, knowledge sharing, and collaborative projects, we
            create opportunities for meaningful connections and collective
            impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background rounded-xl p-6 space-y-3">
            <div className="text-3xl">🤝</div>
            <h3 className="text-xl font-semibold text-foreground">
              Collaborative Network
            </h3>
            <p className="text-muted-foreground">
              Connect with climate founders and build lasting partnerships.
            </p>
          </div>
          <div className="bg-background rounded-xl p-6 space-y-3">
            <div className="text-3xl">📚</div>
            <h3 className="text-xl font-semibold text-foreground">
              Knowledge Sharing
            </h3>
            <p className="text-muted-foreground">
              Learn from experts and share insights through workshops and
              events.
            </p>
          </div>
          <div className="bg-background rounded-xl p-6 space-y-3">
            <div className="text-3xl">🚀</div>
            <h3 className="text-xl font-semibold text-foreground">
              Collective Impact
            </h3>
            <p className="text-muted-foreground">
              Amplify your climate initiatives through community support and
              shared resources.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Latest Insights
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Stay updated with news, insights, and stories from the climate
            business community.
          </h2>
        </div>
        <RecentPosts />
      </section>

      {/* Join Community CTA */}
      <section className="text-center space-y-8 py-16 bg-muted/30 rounded-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Join the ClimateFair Community
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Whether you're a climate entrepreneur, investor, or simply passionate
          about sustainability, there's a place for you here.
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

      {/* Footer Tagline */}
      <section className="text-center text-muted-foreground pb-12">
        Helping climate founders win — through customers, community, and
        capital.
      </section>
    </div>
  );
}
