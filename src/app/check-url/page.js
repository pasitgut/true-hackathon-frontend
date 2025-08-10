'use client'

import { useState } from 'react'

export default function CheckUrlScreen() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleCheckUrl = async () => {
    if (!url) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('http://localhost:8080/api/check-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      if (!res.ok) throw new Error('เกิดข้อผิดพลาดจากเซิร์ฟเวอร์')

      const data = await res.json()
      console.log(data)
      setResult(data.safe)
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">ตรวจสอบ URL</h1>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="กรอก URL ที่ต้องการตรวจสอบ"
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={handleCheckUrl}
          disabled={isLoading || !url}
          className="bg-red-600 text-white rounded-md px-4 py-2 font-semibold hover:bg-red-700 transition disabled:opacity-50"
        >
          {isLoading ? 'กำลังตรวจสอบ...' : 'ตรวจสอบ'}
        </button>

        {error && (
          <div className="text-red-500 text-sm">
            ❌ {error}
          </div>
        )}

        {result !== null && (
  <div className={`p-4 rounded-md shadow ${result ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
    {result ? '✅ ปลอดภัย (Safe)' : '⚠️ ไม่ปลอดภัย (Not Safe)'}
  </div>
)}
      </div>
    </div>
  )
}
