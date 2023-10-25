// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
 console.log(req.method);
 console.log(req.body);
  if (req.method !== 'POST') {
     res.status(200).json({ name: "Jhon Doe" });
  } else {
    
  }
}
