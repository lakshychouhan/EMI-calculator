"use client"

import { useState, useCallback } from "react"

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("")
  const [interestRate, setInterestRate] = useState<string>("")
  const [loanTenure, setLoanTenure] = useState<string>("")
  const [emi, setEMI] = useState<number | null>(null)
  const [totalInterest, setTotalInterest] = useState<number | null>(null)

  const calculateEMI = useCallback(() => {
    const P = Number.parseFloat(loanAmount)
    const r = Number.parseFloat(interestRate) / (12 * 100)
    const n = Number.parseFloat(loanTenure) * 12

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
      setEMI(null)
      setTotalInterest(null)
      return
    }

    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalAmount = emiValue * n
    const totalInterestValue = totalAmount - P

    setEMI(Number.parseFloat(emiValue.toFixed(2)))
    setTotalInterest(Number.parseFloat(totalInterestValue.toFixed(2)))
  }, [loanAmount, interestRate, loanTenure])

  const resetCalculator = () => {
    setLoanAmount("")
    setInterestRate("")
    setLoanTenure("")
    setEMI(null)
    setTotalInterest(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">EMI Calculator</h2>
          <p className="text-lg text-indigo-500">Calculate your Equated Monthly Installment (EMI)</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="loanAmount" className="block text-sm font-medium text-indigo-700">
                Loan Amount
              </label>
              <input
                id="loanAmount"
                type="number"
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="interestRate" className="block text-sm font-medium text-indigo-700">
                Interest Rate (% per annum)
              </label>
              <input
                id="interestRate"
                type="number"
                placeholder="Enter interest rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="loanTenure" className="block text-sm font-medium text-indigo-700">
                Loan Tenure (in years)
              </label>
              <input
                id="loanTenure"
                type="number"
                placeholder="Enter loan tenure"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={calculateEMI}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Calculate EMI
              </button>
              <button
                onClick={resetCalculator}
                className="flex-1 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {emi !== null && totalInterest !== null && (
              <>
                <div className="text-center p-4 bg-indigo-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-700">Your Monthly EMI</h3>
                  <p className="text-3xl font-bold text-indigo-800">
                    {emi.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-indigo-700">
                    Total Interest:{" "}
                    <span className="font-semibold">
                      {totalInterest.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </span>
                  </p>
                  <p className="text-indigo-700">
                    Total Amount:{" "}
                    <span className="font-semibold">
                      {(Number.parseFloat(loanAmount) + totalInterest).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

