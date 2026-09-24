import * as THREE from "three";

const SNAP_RATE = 6.0; // wobble redraws per second, low-fps look per Zucconi's doodle shader
const JITTER_AMPLITUDE = 0.006; // object-space units
const OUTLINE_THICKNESS = 0.018; // object-space units, inverted-hull extrusion

// hash-based pseudo-random per-vertex jitter, snapped to a low framerate so the
// silhouette redraws itself in discrete jumps instead of drifting smoothly
const WOBBLE_CHUNK = /* glsl */ `
  uniform float uTime;
  uniform float uSnapRate;
  uniform float uJitterAmp;

  float doodleHash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  vec3 doodleWobble(vec3 pos, vec3 normal) {
    float snappedTime = floor(uTime * uSnapRate) / uSnapRate;
    float n = doodleHash(pos * 12.0 + snappedTime) - 0.5;
    return pos + normal * n * uJitterAmp;
  }
`;

// world-space normal (not view-space) so it lines up with uLightDir, which
// is also authored in world space and stays fixed as the bust rotates
const FILL_VERTEX = /* glsl */ `
  ${WOBBLE_CHUNK}
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec3 wobbled = doodleWobble(position, normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(wobbled, 1.0);
  }
`;

// flat toon shading: hard-stepped bands instead of smooth lighting, so the
// bust reads as a few flat ink washes rather than a rendered 3D surface
const FILL_FRAGMENT = /* glsl */ `
  uniform vec3 uInkColor;
  uniform vec3 uPaperColor;
  uniform vec3 uLightDir;
  varying vec3 vNormal;

  void main() {
    float ndotl = max(dot(normalize(vNormal), uLightDir), 0.0);
    vec3 color;
    if (ndotl > 0.6) {
      color = mix(uInkColor, uPaperColor, 0.85);
    } else if (ndotl > 0.25) {
      color = mix(uInkColor, uPaperColor, 0.45);
    } else {
      color = uInkColor;
    }
    gl_FragColor = vec4(color, 1.0);
  }
`;

const OUTLINE_VERTEX = /* glsl */ `
  ${WOBBLE_CHUNK}
  uniform float uOutlineThickness;

  void main() {
    vec3 extruded = position + normal * uOutlineThickness;
    vec3 wobbled = doodleWobble(extruded, normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(wobbled, 1.0);
  }
`;

const OUTLINE_FRAGMENT = /* glsl */ `
  uniform vec3 uInkColor;

  void main() {
    gl_FragColor = vec4(uInkColor, 1.0);
  }
`;

export type DoodleMaterials = {
  fill: THREE.ShaderMaterial;
  outline: THREE.ShaderMaterial;
};

/**
 * Builds the flat-shaded fill material and inverted-hull outline material for
 * the hand-drawn "doodle" look: {@link https://www.alanzucconi.com/2019/04/16/sprite-doodle-shader-effect/}
 * for the wobble technique, adapted to 3D with a normal-extruded backface outline.
 */
export function createDoodleMaterials(
  inkColor: THREE.Color,
  paperColor: THREE.Color,
): DoodleMaterials {
  const lightDir = new THREE.Vector3(2, 2, 3).normalize();

  const fill = new THREE.ShaderMaterial({
    vertexShader: FILL_VERTEX,
    fragmentShader: FILL_FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uSnapRate: { value: SNAP_RATE },
      uJitterAmp: { value: JITTER_AMPLITUDE },
      uInkColor: { value: inkColor },
      uPaperColor: { value: paperColor },
      uLightDir: { value: lightDir },
    },
  });

  const outline = new THREE.ShaderMaterial({
    vertexShader: OUTLINE_VERTEX,
    fragmentShader: OUTLINE_FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uSnapRate: { value: SNAP_RATE },
      uJitterAmp: { value: JITTER_AMPLITUDE },
      uOutlineThickness: { value: OUTLINE_THICKNESS },
      uInkColor: { value: inkColor },
    },
    side: THREE.BackSide,
  });

  return { fill, outline };
}
