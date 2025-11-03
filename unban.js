export default async function handler(req, res) {
  const { auth } = req.headers;
  const SECRET_KEY = 'your-secret-key-123';
  
  if (auth !== SECRET_KEY) {
    return res.status(401).json({ message: '❌ Unauthorized' });
  }
  
  const { number } = req.body;
  
  console.log(`Unbanned: ${number}`);
  
  res.json({ 
    success: true, 
    message: `✅ Nomor ${number} di-unban!` 
  });
}