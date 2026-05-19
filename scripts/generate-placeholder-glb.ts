/**
 * Generates a minimal placeholder.glb — a textured wooden plank plane.
 * Uses raw glTF binary format (GLB).
 */
import * as fs from 'fs';
import * as path from 'path';

function writeGLB(): void {
  // Minimal glTF 2.0 JSON — a 2m × 0.19m floor plane
  const gltf = {
    asset: { version: '2.0', generator: 'natural-floor-placeholder' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [
      {
        name: 'FloorPlane',
        primitives: [
          {
            attributes: { POSITION: 0, TEXCOORD_0: 1, NORMAL: 2 },
            indices: 3,
            material: 0,
          },
        ],
      },
    ],
    materials: [
      {
        name: 'WoodMaterial',
        pbrMetallicRoughness: {
          baseColorFactor: [0.72, 0.5, 0.28, 1.0],
          metallicFactor: 0.0,
          roughnessFactor: 0.8,
        },
        doubleSided: true,
      },
    ],
    // Positions: 4 corners of 1.9m × 0.19m plank, flat on XZ plane
    // POSITION: 4 vertices × 3 floats
    // TEXCOORD_0: 4 vertices × 2 floats
    // NORMAL: 4 vertices × 3 floats (all pointing up Y)
    // INDICES: 2 triangles × 3 uint16
    accessors: [
      {
        name: 'POSITION',
        bufferView: 0,
        byteOffset: 0,
        componentType: 5126,
        count: 4,
        type: 'VEC3',
        min: [-0.95, 0, -0.095],
        max: [0.95, 0, 0.095],
      },
      {
        name: 'TEXCOORD_0',
        bufferView: 1,
        byteOffset: 0,
        componentType: 5126,
        count: 4,
        type: 'VEC2',
      },
      {
        name: 'NORMAL',
        bufferView: 2,
        byteOffset: 0,
        componentType: 5126,
        count: 4,
        type: 'VEC3',
      },
      {
        name: 'INDICES',
        bufferView: 3,
        byteOffset: 0,
        componentType: 5123,
        count: 6,
        type: 'SCALAR',
      },
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: 48 },   // POSITION  4×12
      { buffer: 0, byteOffset: 48, byteLength: 32 },  // TEXCOORD  4×8
      { buffer: 0, byteOffset: 80, byteLength: 48 },  // NORMAL    4×12
      { buffer: 0, byteOffset: 128, byteLength: 12 }, // INDICES   6×2 (padded to 12)
    ],
    buffers: [{ byteLength: 140 }],
  };

  // Build binary buffer
  const buf = Buffer.alloc(140);

  // POSITION (4 vertices × vec3 float32)
  const positions = [
    -0.95, 0, -0.095,
     0.95, 0, -0.095,
     0.95, 0,  0.095,
    -0.95, 0,  0.095,
  ];
  positions.forEach((v, i) => buf.writeFloatLE(v, i * 4));

  // TEXCOORD_0 (offset 48)
  const uvs = [0, 0, 1, 0, 1, 1, 0, 1];
  uvs.forEach((v, i) => buf.writeFloatLE(v, 48 + i * 4));

  // NORMAL (offset 80) — all [0, 1, 0]
  const normals = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
  normals.forEach((v, i) => buf.writeFloatLE(v, 80 + i * 4));

  // INDICES (offset 128) — two triangles: 0,1,2  0,2,3
  const indices = [0, 1, 2, 0, 2, 3];
  indices.forEach((v, i) => buf.writeUInt16LE(v, 128 + i * 2));

  // GLB magic, version, total length
  const jsonStr = JSON.stringify(gltf);
  const jsonBuf = Buffer.from(jsonStr, 'utf8');
  // JSON chunk must be padded to 4-byte boundary with spaces
  const jsonPad = (4 - (jsonBuf.length % 4)) % 4;
  const jsonChunkLen = jsonBuf.length + jsonPad;

  const binChunkLen = buf.length; // already 140

  const totalLen = 12 + 8 + jsonChunkLen + 8 + binChunkLen;
  const glb = Buffer.alloc(totalLen);

  let off = 0;
  // Header
  glb.writeUInt32LE(0x46546c67, off); off += 4; // 'glTF'
  glb.writeUInt32LE(2, off); off += 4;           // version
  glb.writeUInt32LE(totalLen, off); off += 4;    // total length

  // JSON chunk
  glb.writeUInt32LE(jsonChunkLen, off); off += 4;
  glb.writeUInt32LE(0x4e4f534a, off); off += 4;  // 'JSON'
  jsonBuf.copy(glb, off); off += jsonBuf.length;
  glb.fill(0x20, off, off + jsonPad); off += jsonPad; // space padding

  // BIN chunk
  glb.writeUInt32LE(binChunkLen, off); off += 4;
  glb.writeUInt32LE(0x004e4942, off); off += 4;  // 'BIN\0'
  buf.copy(glb, off);

  const outDir = path.join(process.cwd(), 'public/models');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'placeholder.glb'), glb);
  console.log('  ✓ placeholder.glb');
}

writeGLB();
