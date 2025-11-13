import React from "react";
import SEO from "../components/Seo";

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-white to-blue-50 px-6 py-20">
      <SEO title={"About"} description={""} />

      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 text-center tracking-tight">
          About Our Paragliding Community
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          Welcome to a space built by and for paragliding pilots. Our mission is
          to connect pilots from around the world, share reliable knowledge, and
          build a supportive, eco-friendly community that grows together — in
          the air and on the ground.
        </p>

        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            We are creating a detailed <strong>flying site library</strong> — a
            collection of important paragliding locations enriched with real
            insights: weather nuances, approach notes, maps, hazards, local
            rules, access tips, and more.
          </p>

          <p>
            Our goal is to keep this information{" "}
            <strong>accurate and up to date</strong>. And the best way to do
            that is together — with the help of local pilots, traveling pilots,
            instructors, clubs, and passionate community members.
          </p>

          <p>
            If you are a <strong>local pilot</strong>, or simply someone who has
            flown a site and knows something that could help others, we
            encourage you to leave comments, share corrections, add missing
            details, or report updates. Your knowledge can make a difference for
            another pilot’s safety and experience.
          </p>

          <p>
            Have you <strong>documented a flying region</strong>? We would be
            more than happy to include your work. Send us an email — together we
            make this resource better for everyone who loves free flight.
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8 space-y-4">
          <h2 className="text-2xl font-bold text-blue-700">Our Values</h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li>
              🪂 <strong>Community First</strong> — We grow by helping each
              other.
            </li>
            <li>
              🌍 <strong>Eco-Friendly Mindset</strong> — We encourage shared
              rides, group hikes to takeoff, and environmental awareness.
            </li>
            <li>
              🎓 <strong>Learning & Progress</strong> — Free knowledge for
              beginners to train safely.
            </li>
            <li>
              🤝 <strong>Open Contribution</strong> — Everyone can help.
              Everyone is welcome.
            </li>
          </ul>
        </div>

        <p className="text-center text-lg text-gray-700 pt-6 max-w-3xl mx-auto">
          Whether you’re a new pilot discovering the skies or a long-time flyer
          exploring new regions — you’re invited to be part of this.
          <span className="block font-semibold text-blue-700 mt-2">
            Together, we fly further.
          </span>
        </p>

        <div className="text-center pt-4">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Contact Us & Contribute
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
