export default async function handler(req, res) {
  const { auth } = req.headers;
  const SECRET_KEY = 'your-secret-key-123';
  
  if (auth !== SECRET_KEY) {
    return res.status(401).json({ message: '❌ Unauthorized' });
  }
  
  const { action } = req.body; // 'disable' or 'enable'
  
  console.log(`Global ${action}`);
  
  res.json({ 
    success: true, 
    message: action === 'disable' ? 
      '❌ Semua bot dimatikan!' : 
      '✅ Semua bot diaktifkan!'
  });
}