// components/Testimonials.tsx
export default function Testimonials() {
  const reviews = [
    {
      name: "Ayesha Rahman",
      review: "Extremely fresh vegetables! I could literally smell the farm freshness.",
      rating: 5,
    },
    {
      name: "Mahmud Hasan",
      review: "Very fast delivery and great quality fruits. Highly recommended!",
      rating: 4,
    },
    {
      name: "Farhana Islam",
      review: "The best organic shop in town. Prices are fair and products are premium.",
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-20 bg-green-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl font-bold text-green-700 mb-10">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-yellow-500 text-xl mb-3">
                {"⭐".repeat(r.rating)}
              </p>

              <p className="text-gray-600 italic mb-4">{r.review}</p>

              <h3 className="font-semibold text-gray-800">{r.name}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
