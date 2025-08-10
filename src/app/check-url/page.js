'use client'

import { useState, useEffect } from 'react'

export default function CheckUrlScreen() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [familyId, setFamilyId] = useState(null)
  const [blockMessage, setBlockMessage] = useState('')
  const [blockedUrls, setBlockedUrls] = useState([])

  // ดึง family_id จาก localStorage
  useEffect(() => {
    const storedFamilyId = localStorage.getItem('family_id')
    if (storedFamilyId) setFamilyId(storedFamilyId)
  }, [])

  // ดึงรายการเว็บไซต์ที่ถูกบล็อก
  useEffect(() => {
    const fetchBlockedUrls = async () => {
      if (!familyId) return

      try {
        const res = await fetch(`http://localhost:8080/api/family/block-website/${familyId}`)
        if (!res.ok) throw new Error('โหลดรายการเว็บไซต์ที่ถูกบล็อกไม่สำเร็จ')

        const data = await res.json()
        setBlockedUrls(data.data || []) // ← ใช้ data.data ตามรูปแบบ response
      } catch (err) {
        console.error('❌', err.message)
      }
    }

    fetchBlockedUrls()
  }, [familyId, blockMessage]) // ให้โหลดใหม่ทุกครั้งหลังมีการบล็อก

  const handleCheckUrl = async () => {
    if (!url) return

    setIsLoading(true)
    setError(null)
    setResult(null)
    setBlockMessage('')

    try {
      const res = await fetch('http://localhost:8080/api/check-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      if (!res.ok) throw new Error('เกิดข้อผิดพลาดจากเซิร์ฟเวอร์')

      const data = await res.json()
      setResult(data.safe)
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBlockWebsite = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('ไม่พบ token')

      const decoded = JSON.parse(atob(token.split('.')[1]))
      const user_id = decoded.id

      const res = await fetch('http://localhost:8080/api/family/block-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id,
          family_id: familyId,
          url,
        }),
      })

      if (!res.ok) throw new Error('บล็อกไม่สำเร็จ')

      setBlockMessage('✅ บล็อกเว็บไซต์สำเร็จแล้ว')
      setUrl('')
    } catch (err) {
      setBlockMessage(`❌ ${err.message || 'เกิดข้อผิดพลาดขณะบล็อก'}`)
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
          <div className="text-red-500 text-sm">❌ {error}</div>
        )}

        {result !== null && (
          <div className={`p-4 rounded-md shadow ${result ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {result ? '✅ ปลอดภัย (Safe)' : '⚠️ ไม่ปลอดภัย (Not Safe)'}
          </div>
        )}

        {!result && familyId && url && (
          <button
            onClick={handleBlockWebsite}
            className="bg-black text-white rounded-md px-4 py-2 font-semibold hover:bg-gray-800 transition"
          >
            บล็อกเว็บไซต์นี้ในครอบครัว
          </button>
        )}

        {blockMessage && (
          <div className="text-sm mt-2">{blockMessage}</div>
        )}
      </div>

      {/* รายการเว็บไซต์ที่ถูกบล็อก */}
      {blockedUrls.length > 0 && (
        <div className="mt-10 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2">🌐 เว็บไซต์ที่ถูกบล็อก:</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            {blockedUrls.map((item) => (
              <li key={item.id}>
                <div className="flex flex-col">
                  <span>{item.url}</span>
                  <span className="text-xs text-gray-500">
                    บล็อกเมื่อ: {new Date(item.create_at).toLocaleString('th-TH')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
