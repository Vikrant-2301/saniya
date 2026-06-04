import fs from "fs";
import path from "path";
import ClientHome from "./ClientHome";

export default function Home() {
  const assetsDir = path.join(process.cwd(), "public", "assets");
  let images = [];
  try {
    const files = fs.readdirSync(assetsDir);
    images = files
      .filter((file) => file.match(/\.(jpeg|jpg|png|gif|webp)$/i))
      .sort(); // consistent ordering
  } catch (err) {
    console.error("Error reading assets directory:", err);
  }

  return <ClientHome initialImages={images} />;
}
