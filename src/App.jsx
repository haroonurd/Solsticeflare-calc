import React, { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function App() {
  const [deposit, setDeposit] = useState(1000);
  const [flarePrice, setFlarePrice] = useState(0.0005);
  const [dailyFlares, setDailyFlares] = useState(50);

  const projection = Array.from({ length: 30 }, (_, i) => {
    const flares = dailyFlares * (i + 1);
    return { day: i + 1, value: flares * flarePrice };
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Solstice Flares Calculator</h1>

      <div className="grid gap-4">
        <input className="p-2 rounded bg-gray-800" type="number" value={deposit} onChange={e=>setDeposit(e.target.value)} placeholder="Deposit" />
        <input className="p-2 rounded bg-gray-800" type="number" value={flarePrice} onChange={e=>setFlarePrice(e.target.value)} placeholder="Flare Price" />
        <input className="p-2 rounded bg-gray-800" type="number" value={dailyFlares} onChange={e=>setDailyFlares(e.target.value)} placeholder="Daily Flares" />
      </div>

      <div className="mt-10">
        <LineChart width={600} height={300} data={projection}>
          <Line type="monotone" dataKey="value" stroke="white" />
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}