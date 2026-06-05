import fs from "fs";
import path from "path";
import ClientHome from "./ClientHome";

export default function Home() {
  const assetsDir = path.join(process.cwd(), "public", "assets");
  const sonalDir = path.join(process.cwd(), "public", "assets", "sonal");

  let saniyaImages = [];
  let sonalImages = [];

  try {
    const rootFiles = fs.readdirSync(assetsDir);
    saniyaImages = rootFiles
      .filter((file) => file.match(/\.(jpeg|jpg|png|gif|webp)$/i))
      .sort()
      .map((f) => f); // just filename, served from /assets/
  } catch (err) {
    console.error("Error reading assets directory:", err);
  }

  try {
    const sonalFiles = fs.readdirSync(sonalDir);
    sonalImages = sonalFiles
      .filter((file) => file.match(/\.(jpeg|jpg|png|gif|webp)$/i))
      .sort()
      .map((f) => `sonal/${f}`); // prefixed with sonal/
  } catch (err) {
    console.error("Error reading sonal directory:", err);
  }

  return <ClientHome saniyaImages={saniyaImages} sonalImages={sonalImages} />;
}
