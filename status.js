export default async function handler(req, res) {
  const db = {
    globalDisabled: false,
    totalLicenses: 1,
    activeLicenses: 1,
    bannedNumbers: 0
  };
  
  res.json(db);
}