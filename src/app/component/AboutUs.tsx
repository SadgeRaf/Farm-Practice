import Image from "next/image";
import img from "../../../public/d8db2027-dba2-4ba4-a980-19fb1d09c4d1.jpg"


export default function AboutSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 items-center">
        
        {/* Image */}
        <div>
          <Image
            src={img}
            alt="Farm Image"
            className="rounded-xl shadow-md"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-4xl font-bold text-green-700 mb-4">
            About Khan Agro
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            At Khan Agro, we are committed to providing fresh, organic, and 
            chemical-free food directly from trusted local farms. Our goal is 
            to bring health, purity, and sustainability to your doorstep.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Whether it's vegetables, fruits, dairy, or fisheries — we ensure 
            every product meets the highest quality standards so your family 
            enjoys only the best.
          </p>
        </div>
      </div>
    </section>
  );
}
