export default async function handler(req, res) {
  // Authentication (optional)
  const { auth } = req.headers;
  const SECRET_KEY = 'your-secret-key-123'; // Ganti dengan password kamu
  
  if (auth !== SECRET_KEY) {
    return res.status(401).json({ message: '❌ Unauthorized' });
  }
  
  const { number } = req.body;
  
  // TODO: Update database (Vercel KV)
  // Untuk demo:
  console.log(`Banned: ${number}`);
  
  res.json({ 
    success: true, 
    message: `✅ Nomor ${number} di-banned!` 
  });
}