import { writeFile } from "node:fs/promises";
import { deflateSync } from "node:zlib";
function crc(buf) {
  let c = 0xffffffff;
  for (const b of buf) {
    c ^= b;
    for (let i = 0; i < 8; i++) c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
  }
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(name, data) {
  const t = Buffer.from(name),
    n = Buffer.alloc(4),
    v = Buffer.alloc(4);
  n.writeUInt32BE(data.length);
  v.writeUInt32BE(crc(Buffer.concat([t, data])));
  return Buffer.concat([n, t, data, v]);
}
for (const size of [192, 512]) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * (size * 4 + 1) + 1 + x * 4;
      const panel =
        x > size * 0.17 && x < size * 0.83 && y > size * 0.2 && y < size * 0.8;
      const bar =
        panel &&
        x > size * 0.24 &&
        x < size * 0.76 &&
        ((y > size * 0.3 && y < size * 0.39) ||
          (y > size * 0.48 && y < size * 0.57) ||
          (y > size * 0.66 && y < size * 0.72));
      const col = panel && !bar ? [243, 161, 60] : [23, 27, 26];
      raw.set([...col, 255], i);
    }
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size);
  header.writeUInt32BE(size, 4);
  header.set([8, 6, 0, 0, 0], 8);
  await writeFile(
    `public/icon-${size}.png`,
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk("IHDR", header),
      chunk("IDAT", deflateSync(raw)),
      chunk("IEND", Buffer.alloc(0)),
    ]),
  );
}
