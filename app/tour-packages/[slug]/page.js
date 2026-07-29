import { notFound } from "next/navigation";

async function getPackage(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/public/tour-packages/${slug}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!data.success) {
      return null;
    }

    return data.package;

  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function generateMetadata({ params }) {

  const { slug } = await params;

  const pkg = await getPackage(slug);

  if (!pkg) {
    return {
      title: "Tour Package Not Found",
    };
  }


  return {
    title: `${pkg.title} | RC Tours & Travels`,
    description: pkg.description,

    keywords: [
      pkg.title,
      "Nagpur Tour Package",
      "Nagpur Cab Service",
      "RC Tours and Travels",
    ],

  };
}



export default async function TourPackageDetails({ params }) {

  const { slug } = await params;

  const pkg = await getPackage(slug);


  if (!pkg) {
    notFound();
  }


  return (

    <main className="min-h-screen bg-slate-50 pt-32 pb-20">


      {/* Hero */}

      <section className="max-w-6xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">


          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-[350px] md:h-[500px] object-cover"
          />


          <div className="p-8">


            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-5">
              {pkg.title}
            </h1>


            <div className="grid md:grid-cols-3 gap-5 mb-8">


              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-blue-700">
                  📍 Location
                </h3>
                <p>{pkg.location}</p>
              </div>


              <div className="bg-green-50 rounded-xl p-5">
                <h3 className="font-bold text-green-700">
                  💰 Price
                </h3>
                <p>₹{pkg.price}</p>
              </div>


              <div className="bg-yellow-50 rounded-xl p-5">
                <h3 className="font-bold text-yellow-700">
                  ⏳ Duration
                </h3>
                <p>{pkg.duration}</p>
              </div>


            </div>



            <h2 className="text-3xl font-bold mb-4">
              Tour Details
            </h2>


            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {pkg.description}
            </p>



            <div className="grid md:grid-cols-2 gap-4">


              <a
                href="tel:+919172271464"
                className="bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl font-bold text-lg"
              >
                📞 Call Now
              </a>



              <a
                href={`https://wa.me/919172271464?text=Hello RC Tours & Travels, I want details about ${pkg.title}`}
                target="_blank"
                className="bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-xl font-bold text-lg"
              >
                💬 WhatsApp Booking
              </a>


            </div>


          </div>


        </div>


      </section>



      {/* Why Choose */}

      <section className="max-w-6xl mx-auto px-6 mt-12">

        <div className="bg-white rounded-3xl p-8 shadow-lg">


          <h2 className="text-3xl font-black mb-6">
            Why Choose RC Tours & Travels?
          </h2>


          <div className="grid md:grid-cols-4 gap-5">


            <div className="p-5 bg-slate-50 rounded-xl">
              🚖 Comfortable Cars
            </div>


            <div className="p-5 bg-slate-50 rounded-xl">
              👨‍✈️ Experienced Drivers
            </div>


            <div className="p-5 bg-slate-50 rounded-xl">
              📞 24×7 Support
            </div>


            <div className="p-5 bg-slate-50 rounded-xl">
              💰 Best Price
            </div>


          </div>


        </div>


      </section>


    </main>

  );
}