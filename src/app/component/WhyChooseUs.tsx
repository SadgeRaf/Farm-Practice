// components/WhyChooseUs.tsx
export default function WhyChooseUs() {
  const features = [
    {
      title: "100% Organic",
      desc: "All products are naturally grown without chemicals.",
      icon: "🌿",
    },
    {
      title: "Farm Fresh",
      desc: "Directly sourced from local farms every day.",
      icon: "🚜",
    },
    {
      title: "Affordable Pricing",
      desc: "Top-quality organic food at reasonable prices.",
      icon: "💰",
    },
    {
      title: "Fast Delivery",
      desc: "We ensure quick delivery to maintain freshness.",
      icon: "⚡",
    },
  ];

  return (
    <section className="w-full py-20 bg-green-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-10">
          Why Choose Khan Agro?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-xl text-gray-800 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
