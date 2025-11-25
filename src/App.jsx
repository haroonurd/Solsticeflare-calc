import React, { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function App() {
  const [fdv, setFDV] = useState(1000000);
  const [airdropPct, setAirdropPct] = useState(5);
  const [airdropSupply, setAirdropSupply] = useState(50000);
  const [flaresEarned, setFlaresEarned] = useState(100);
  const [totalFlares, setTotalFlares] = useState(1000000);
  const [deposit, setDeposit] = useState(1000);
  const [flareUSD, setFlareUSD] = useState(0.0005);
  const [tvl, setTVL] = useState(50000);

  // Calculations
  const yourAirdropTokens = (airdropPct / 100) * airdropSupply;
  const dailyUSD = flaresEarned * flareUSD;
  const weeklyUSD = dailyUSD * 7;
  const monthlyUSD = dailyUSD * 30;
  const totalValueUSD = dailyUSD + yourAirdropTokens * flareUSD;

  const projection = Array.from({ length: 30 }, (_, i) => {
    const cumValue = (dailyUSD) * (i + 1) + yourAirdropTokens * flareUSD;
    return { day: i + 1, value: parseFloat(cumValue.toFixed(4)) };
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Solstice Flares Calculator</h1>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input className="p-2 rounded bg-gray-800" type="number" value={fdv} onChange={e=>setFDV(Number(e.target.value))} placeholder="FDV Launch" />
        <input className="p-2 rounded bg-gray-800" type="number" value={airdropPct} onChange={e=>setAirdropPct(Number(e.target.value))} placeholder="Airdrop Allocation %" />
        <input className="p-2 rounded bg-gray-800" type="number" value={airdropSupply} onChange={e=>setAirdropSupply(Number(e.target.value))} placeholder="Supply of Airdrop" />
        <input className="p-2 rounded bg-gray-800" type="number" value={flaresEarned} onChange={e=>setFlaresEarned(Number(e.target.value))} placeholder="Flares Earned" />
        <input className="p-2 rounded bg-gray-800" type="number" value={totalFlares} onChange={e=>setTotalFlares(Number(e.target.value))} placeholder="Total Solstice Flares" />
        <input className="p-2 rounded bg-gray-800" type="number" value={deposit} onChange={e=>setDeposit(Number(e.target.value))} placeholder="Your Deposit" />
        <input className="p-2 rounded bg-gray-800" type="number" value={flareUSD} onChange={e=>setFlareUSD(Number(e.target.value))} placeholder="Per Flare USD Value" />
        <input className="p-2 rounded bg-gray-800" type="number" value={tvl} onChange={e=>setTVL(Number(e.target.value))} placeholder="TVL" />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Your Airdrop Tokens</h2>
          <p>{yourAirdropTokens.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Daily Earnings (USD)</h2>
          <p>${dailyUSD.toFixed(4)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Weekly Earnings (USD)</h2>
          <p>${weeklyUSD.toFixed(4)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Monthly Earnings (USD)</h2>
          <p>${monthlyUSD.toFixed(4)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow col-span-1 md:col-span-2">
          <h2 className="font-bold text-lg mb-2">Total Value (USD)</h2>
          <p>${totalValueUSD.toFixed(4)}</p>
        </div>
      </div>

      {/* Projection Chart */}
      <div className="bg-gray-800 p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-2 text-center">Projection Over 30 Days (USD)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={projection}>
            <Line type="monotone" dataKey="value" stroke="#00FFAA" strokeWidth={2} />
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
