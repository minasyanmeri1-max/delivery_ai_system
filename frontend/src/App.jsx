import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [traffic, setTraffic] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Կեղծ տվյալներ փորձարկման համար (Պատվեր և Առաքիչներ)
  const handleTestAI = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post('http://localhost:8000/api/process-delivery', {
        order_location: { latitude: 40.3512, longitude: 45.1264 }, // Գավառի կոորդինատներ
        couriers: [
          { id: 1, name: "Արմեն Գևորգյան", latitude: 40.3550, longitude: 45.1210, load: 1 },
          { id: 2, name: "Կարեն Նազարյան", latitude: 40.3420, longitude: 45.1390, load: 3 },
          { id: 3, name: "Արթուր Մելքոնյան", latitude: 40.3600, longitude: 45.1100, load: 0 }
        ],
        traffic_level: parseInt(traffic)
      });
      setResult(response.data);
    } catch (error) {
      alert("Սխալ՝ Բեքենդ սերվերը անհասանելի է:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Առաքման ԱԻ Ծրագրային Համակարգ</h1>
      <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Մերի Օհանյան - Ավարտական Աշխատանք</p>
      
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginTop: '20px' }}>
        <h3>ԱԻ Օպտիմալացման Թեստ</h3>
        
        <label><b>Խցանումների մակարդակ քաղաքում՝</b></label>
        <select value={traffic} onChange={(e) => setTraffic(e.target.value)} style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0 20px 0', borderRadius: '4px' }}>
          <option value="0">Թեթև երթևեկություն (Գիշեր / Ոչ պիկ ժամ)</option>
          <option value="1">Միջին ծանրաբեռնվածություն</option>
          <option value="2">Ծանր խցանումներ (Պիկ ժամ)</option>
        </select>

        <button onClick={handleTestAI} disabled={loading} style={{ background: '#3498db', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontSize: '16px' }}>
          {loading ? "Հաշվարկվում է ԱԻ ալգորիթմներով..." : "Գործարկել Օպտիմալացումը (KNN + Decision Tree)"}
        </button>
      </div>

      {result && (
        <div style={{ background: '#d4edda', color: '#155724', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '1px solid #c3e6cb' }}>
          <h2>ԱԻ Հաշվարկի Արդյունք.</h2>
          <p><b>Ընտրված օպտիմալ առաքիչ՝</b> {result.selected_courier.name} (ID: {result.selected_courier.id})</p>
          <p><b>Հեռավորությունը մինչև պատվեր՝</b> {result.selected_courier.distance_km} կմ</p>
          <p style={{ fontSize: '18px', color: '#721c24' }}><b>Կանխատեսված առաքման ժամանակ (ETA)՝ {result.estimated_delivery_time_minutes} րոպե</b></p>
        </div>
      )}
    </div>
  );
}

export default App;
