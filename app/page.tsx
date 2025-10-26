"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import foodsData from "../data/foods.json";

type AgeKey = keyof typeof foodsData;

interface FoodDetail {
  [key: string]: string[];
}

const foodDetails: FoodDetail = {
  "ASI eksklusif": [
    "ASI adalah makanan terbaik untuk bayi 0-6 bulan",
    "Mengandung antibodi alami untuk kekebalan tubuh",
    "Tidak perlu tambahan air atau makanan lain",
    "Berikan ASI on-demand sesuai kebutuhan bayi",
  ],
  "Susu formula bayi (sesuai anjuran dokter)": [
    "Pilih formula yang sesuai usia bayi",
    "Rekomendasi merek: Enfamil, Similac, Nutrilon, Lactogen, Bebelac",
    "Konsultasikan dengan dokter untuk memilih yang tepat",
    "Pastikan sterilisasi botol dengan benar",
    "Ikuti takaran yang tertera di kemasan",
  ],
  "Bubur saring beras putih": [
    "Tekstur halus dan mudah dicerna untuk MPASI pertama",
    "Rekomendasi: Gasol Organik, Milna, SUN, Promina",
    "Bisa dibuat sendiri dengan beras putih organik",
    "Campurkan dengan ASI/susu formula untuk rasa familiar",
  ],
  "Pure pisang matang": [
    "Pilih pisang ambon atau cavendish yang matang sempurna",
    "Kaya kalium dan serat alami",
    "Haluskan dengan garpu atau blender",
    "Berikan segera setelah dihaluskan",
  ],
  "Pure labu kuning": [
    "Kaya vitamin A untuk kesehatan mata",
    "Kukus hingga empuk lalu haluskan",
    "Tekstur lembut dan rasa manis alami",
    "Bisa dicampur dengan ASI untuk tekstur lebih halus",
  ],
  "Pure alpukat lembut": [
    "Kaya lemak sehat untuk perkembangan otak",
    "Pilih alpukat yang matang dan lembut",
    "Haluskan langsung tanpa dimasak",
    "Berikan dalam porsi kecil untuk awal",
  ],
  "Bubur tim halus ayam": [
    "Gunakan daging ayam tanpa kulit dan lemak",
    "Rekomendasi: ayam kampung organik lebih baik",
    "Masak hingga sangat lembut dan haluskan sempurna",
    "Tambahkan sayuran seperti wortel dan bayam",
  ],
  "Pure wortel + kentang": [
    "Kombinasi karbohidrat dan vitamin A",
    "Kukus wortel dan kentang hingga empuk",
    "Haluskan dengan blender atau saringan",
    "Bisa ditambah sedikit mentega unsalted",
  ],
  "Bubur nasi lembek": [
    "Tekstur lebih kasar untuk melatih mengunyah",
    "Masak nasi dengan air lebih banyak",
    "Tambahkan protein (ayam/ikan) dan sayuran",
    "Berikan 3x sehari dengan porsi bertahap",
  ],
  "Tahu kukus lembut": [
    "Sumber protein nabati yang mudah dicerna",
    "Pilih tahu putih tanpa pengawet",
    "Kukus hingga matang dan haluskan",
    "Bisa dicampur dengan bubur atau sayuran",
  ],
  "Pure pepaya": [
    "Kaya vitamin C dan enzim papain",
    "Pilih pepaya matang berwarna oranye",
    "Haluskan langsung tanpa dimasak",
    "Membantu pencernaan bayi",
  ],
  "Nasi lembek + ikan kukus": [
    "Pilih ikan tanpa duri: salmon, kakap, atau dori",
    "Rekomendasi: ikan salmon kaya omega-3",
    "Kukus ikan dengan sedikit air jeruk nipis",
    "Pastikan tidak ada duri sama sekali",
  ],
  "Sup sayur lembut": [
    "Kombinasi wortel, kentang, brokoli, dan tomat",
    "Masak hingga sangat lembut",
    "Bisa ditambah kaldu ayam tanpa garam",
    "Haluskan sesuai kemampuan mengunyah bayi",
  ],
  "Omelet telur (matang sempurna)": [
    "Gunakan telur ayam kampung atau omega-3",
    "Masak hingga benar-benar matang (tidak setengah matang)",
    "Potong kecil-kecil untuk finger food",
    "Pastikan bayi tidak alergi telur terlebih dahulu",
  ],
  "Yogurt plain tanpa gula": [
    "Rekomendasi: Heavenly Blush Greek Yogurt, Cimory Yogurt Plain",
    "Pilih yang tanpa pemanis dan perasa",
    "Kaya probiotik untuk pencernaan",
    "Berikan dalam porsi kecil sebagai snack",
  ],
  "Buah potong lembut (pisang, pir matang)": [
    "Potong kecil untuk melatih finger food",
    "Pilih buah yang matang dan lembut",
    "Pisang dan pir adalah pilihan aman",
    "Awasi bayi saat makan untuk hindari tersedak",
  ],
};

export default function HomePage() {
  const ageKeys = useMemo(() => Object.keys(foodsData) as AgeKey[], []);
  const [selectedAge, setSelectedAge] = useState<AgeKey>(ageKeys[0]);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const badges: Record<AgeKey, string> = {
    "0-4": "🍼",
    "4-6": "🍌",
    "6-9": "🥕",
    "9-12": "🐟",
  } as const;

  const toggleFood = (food: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(food)) {
        newSet.delete(food);
      } else {
        newSet.add(food);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        {/* Top Section - Baby Food Image Background */}
        <section className="relative py-12 px-6 overflow-hidden h-[320px] md:h-[400px]">
          {/* High Quality Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.jpg"
              alt="Baby Food Background"
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-cover object-center"
              style={{ 
                imageRendering: '-webkit-optimize-contrast',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
            {/* Subtle overlay to improve text readability */}
            <div className="absolute inset-0 bg-white/10"></div>
          </div>
          
          {/* Content Overlay */}
          <div className="max-w-6xl mx-auto text-center relative z-10 h-full flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]">
              Makanan Bayi 0–1 Tahun
            </h1>
          </div>
        </section>

        {/* Bottom Section - Dark Background with Buttons */}
        <section className="relative bg-slate-900 py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-green-500 text-white rounded-full font-bold text-sm shadow-lg">
              ✨ Panduan Nutrisi Bayi
            </div>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-8 leading-relaxed">
              Rekomendasi makanan berdasarkan tahap usia untuk membantu pertumbuhan si kecil dengan nutrisi terbaik.
            </p>
            
            {/* Age Category Pills */}
            <div className="flex gap-3 flex-wrap justify-center">
              {ageKeys.map((age) => (
                <button
                  key={age}
                  onClick={() => {
                    setSelectedAge(age);
                    setExpandedCards(new Set());
                  }}
                  className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-lg
                    ${selectedAge === age
                      ? "bg-white text-slate-900 scale-105 shadow-2xl"
                      : "bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 hover:shadow-xl"}
                  `}
                >
                  <span className="text-2xl">{badges[age]}</span>
                  <span>Usia {age} bulan</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Food Cards Section */}
        <section className="py-20 px-6 bg-white pb-96">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Rekomendasi Makanan
              </h2>
              <p className="text-lg text-slate-600">
                Klik kartu untuk melihat detail dan rekomendasi lengkap
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-48">
              {foodsData[selectedAge].map((food, i) => {
                const hasDetails = food in foodDetails;
                const isExpanded = expandedCards.has(food);
                
                // Vibrant color schemes inspired by Gojek
                const colors = [
                  { bg: 'from-green-400 to-emerald-500', text: 'text-green-900' },
                  { bg: 'from-purple-400 to-pink-500', text: 'text-purple-900' },
                  { bg: 'from-orange-400 to-red-500', text: 'text-orange-900' },
                  { bg: 'from-blue-400 to-cyan-500', text: 'text-blue-900' },
                  { bg: 'from-yellow-400 to-orange-500', text: 'text-yellow-900' },
                  { bg: 'from-pink-400 to-rose-500', text: 'text-pink-900' },
                ];
                const colorScheme = colors[i % colors.length];

                return (
                  <article
                    key={`${selectedAge}-${i}`}
                    className={`rounded-3xl overflow-visible transition-all duration-300 cursor-pointer relative
                      ${isExpanded ? "z-[100]" : "z-10"}
                    `}
                    style={{ marginBottom: isExpanded ? '200px' : '0' }}
                  >
                    <div 
                      className={`rounded-3xl overflow-hidden transition-all duration-300 ${isExpanded ? "shadow-2xl scale-105" : "shadow-xl hover:shadow-2xl"}`}
                      onClick={() => toggleFood(food)}
                    >
                      {/* Card Header with Gradient */}
                      <div className={`bg-gradient-to-br ${colorScheme.bg} p-8 relative overflow-hidden`}>
                        <div className="relative z-10">
                          <div className="text-6xl mb-4">🍽️</div>
                          <h3 className={`text-2xl font-black ${colorScheme.text} leading-tight`}>
                            {food}
                          </h3>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full"></div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
                      </div>

                      {/* Expand Indicator */}
                      {hasDetails && (
                        <div className="bg-slate-50 px-6 py-3 text-center">
                          <span className={`text-sm font-bold text-slate-600 transition-transform duration-300 inline-block ${isExpanded ? "rotate-180" : ""}`}>
                            {isExpanded ? "▲ Tutup" : "▼ Lihat Detail"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content - Positioned below card */}
                    {hasDetails && isExpanded && (
                      <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden animate-fadeIn">
                        <div className="p-6 space-y-3 max-h-72 overflow-y-auto">
                          {foodDetails[food].map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 text-sm text-slate-700"
                            >
                              <span className="text-green-500 mt-0.5 font-bold text-lg">✓</span>
                              <span className="leading-relaxed">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-4xl mb-4">🧸</div>
          <h3 className="text-2xl font-bold mb-3">Makanan Bayi 0–1 Tahun</h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            💡 Konsultasikan dengan dokter anak jika ragu terhadap alergi atau kesiapan makanan.
          </p>
          <div className="text-sm text-slate-500">
            © 2025 Panduan Nutrisi Bayi. Dibuat dengan ❤️ untuk si kecil.
          </div>
        </div>
      </footer>
    </div>
  );
}
