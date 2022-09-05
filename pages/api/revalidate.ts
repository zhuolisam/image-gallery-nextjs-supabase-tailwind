import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { secret } = req.query;
  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ error: "Invalid secret" });
  }

  try {
    //Regenerate index route 
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    // We use send instead of json because we want Next.js to render the last succesfully generated page
    return res.status(500).send("Error revalidation");
  }
}
