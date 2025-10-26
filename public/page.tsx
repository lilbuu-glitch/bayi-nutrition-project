"use client";
import { useMemo, useState } from "react";
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
  ],
  "Susu formula bayi (sesuai anjuran dokter)": [
    "Pilih formula yang sesuai usia bayi",
    "Rekomendasi merek: Enfamil, Similac, Nutrilon, Lactogen",
    "Konsultasikan dengan dokter untuk memilih yang tepat",
    "Pastikan sterilisasi botol dengan benar",
  ],
};

export default function HomePage() {
  const ageKeys = useMemo(() => Object.keys(foodsData) as AgeKey[], []);
  const [selectedAge, setSelectedAge] = useState<AgeKey>(ageKeys[0]);
  const [expandedFood, setExpandedFood] = useState<string | null>(null);

  const badges: Record<AgeKey, string> = {
    "0-4": "🍼",
    "4-6": "🍌",
    "6-9": "🥕",
    "9-12": "🐟",
  } as const;

  const toggleFood = (food: string) => {
    setExpandedFood(expandedFood === food ? null : food);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 flex flex-col items-center py-12 text-slate-700">
      <div className="w-full max-w-3xl px-4">
        <header className="text-center mb-8">
          <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-pink-200 flex items-center justify-center shadow-sm">
            <span className="text-3xl">🧸</span>
          </div>
          <h1 className="text-4xl font-extrabold text-pink-500 tracking-tight mb-2">
            Makanan Bayi 0–1 Tahun
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            Rekomendasi makanan berdasarkan tahap usia untuk membantu pertumbuhan si kecil.
          </p>
        </header>

        <nav className="flex gap-2 md:gap-3 mb-8 flex-wrap justify-center">
          {ageKeys.map((age) => (
            <button
              key={age}
              onClick={() => setSelectedAge(age)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base font-semibold transition shadow-sm border
                ${selectedAge === age
                  ? "bg-pink-400 text-white border-pink-400"
                  : "bg-white/70 backdrop-blur border-pink-200 hover:bg-pink-100"}
              `}
            >
              <span className="text-lg md:text-xl">{badges[age]}</span>
              Usia {age} bulan
            </button>
          ))}
        </nav>

        <section className="grid sm:grid-cols-2 gap-4">
          {foodsData[selectedAge].map((food, i) => {
            const hasDetails = food in foodDetails;
            const isExpanded = expandedFood === food;

            return (
              <article
                key={`${selectedAge}-${i}`}
                className={`bg-white rounded-2xl p-4 border border-rose-100 transition-all duration-300 cursor-pointer
                  ${hasDetails ? "hover:shadow-2xl hover:-translate-y-1 transform" : "hover:shadow-md"}
                  ${isExpanded ? "shadow-2xl scale-105" : "shadow"}
                `}
                style={{
                  transform: isExpanded ? "rotateX(2deg)" : "rotateX(0deg)",
                  transformStyle: "preserve-3d",
                }}
                onClick={() => hasDetails && toggleFood(food)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                    🌟
                  </div>
                  <p className="text-base md:text-lg font-medium text-slate-700 flex-1">
                    {food}
                  </p>
                  {hasDetails && (
                    <span className="text-pink-400 text-xl">
                      {isExpanded ? "▼" : "▶"}
                    </span>
                  )}
                </div>

                {hasDetails && isExpanded && (
                  <div className="mt-4 pt-4 border-t border-rose-100 space-y-2 animate-fadeIn">
                    {foodDetails[food].map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="text-pink-400 mt-0.5">•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <footer className="mt-10 text-center text-xs text-slate-500">
          Konsultasikan dengan dokter anak jika ragu terhadap alergi atau kesiapan makanan.
        </footer>
      </div>
    </main>
  );
}
