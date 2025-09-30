// utils/csvSyncUtil.js
import fs from "fs";
import path from "path";

export function readCSVSync(filePath) {
  const csv = fs.readFileSync(path.resolve(filePath), "utf8");
  const lines = csv.split("\n").filter((line) => line.trim() !== "");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = (values[i] || "").trim(); // safe even if missing value
    });
    return obj;
  });
}
