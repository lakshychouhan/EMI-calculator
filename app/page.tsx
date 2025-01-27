import EMICalculator from "./components/emi-calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <EMICalculator />
    </main>
  )
}

