export default async function handler(req, res) {
  const { botNumber } = req.query;
  
  if (!botNumber) {
    return res.status(400).json({ 
      isValid: false, 
      message: '❌ No bot number provided' 
    });
  }
  
  // GUNAKAN VERCEL KV atau file storage
  // Untuk demo, pake hardcode dulu
  const db = {
    globalDisabled: false, // ← Ubah ini jadi true = semua bot mati!
    bannedNumbers: [
      // '6281234567890' // ← Tambahin nomor yang mau di-ban
    ],
    licenses: [
      {
        number: '6285135729853',
        status: 'active',
        expiry: '2025-12-31'
      }
    ]
  };
  
  // CEK 1: Global kill switch
  if (db.globalDisabled) {
    return res.json({
      isValid: false,
      reason: 'Global disabled',
      message: '❌ Bot sedang maintenance. Hubungi developer!'
    });
  }
  
  // CEK 2: Banned?
  if (db.bannedNumbers.includes(botNumber)) {
    return res.json({
      isValid: false,
      reason: 'Number banned',
      message: '❌ Nomor kamu di-banned!'
    });
  }
  
  // CEK 3: License terdaftar?
  const license = db.licenses.find(l => l.number === botNumber);
  if (!license) {
    return res.json({
      isValid: false,
      reason: 'Not registered',
      message: '❌ Nomor tidak terdaftar! Hubungi developer.'
    });
  }
  
  // CEK 4: Expired?
  if (new Date(license.expiry) < new Date()) {
    return res.json({
      isValid: false,
      reason: 'Expired',
      message: '❌ License expired! Perpanjang license kamu.'
    });
  }
  
  // ✅ VALID!
  return res.json({
    isValid: true,
    message: '✅ License valid',
    expiresAt: license.expiry
  });
}