import * as THREE from "three";

const SNAP_RATE = 6.0; // wobble redraws per second, low-fps look per Zucconi's doodle shader
const JITTER_AMPLITUDE = 0.04; // object-space units
const OUTLINE_THICKNESS = 0.012; // object-space units, inverted-hull extrusion

// per-vertex jitter snapped to a low framerate so the silhouette redraws in
// discrete steps, but the offset at each step is a smooth (sine-based) drift
// off the previous one rather than an independently re-randomized value —
// like a rotoscope artist's hand-traced line crawling frame to frame instead
// of flickering to a new position each time
const WOBBLE_CHUNK = /* glsl */ `
  uniform float uTime;
  uniform float uSnapRate;
  uniform float uJitterAmp;

  float doodleHash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  float doodleCrawl(vec3 seed, float t) {
    float freqA = 0.8 + doodleHash(seed) * 1.1;
    float freqB = 1.6 + doodleHash(seed + 11.0) * 1.7;
    float phaseA = doodleHash(seed + 3.0) * 6.2831853;
    float phaseB = doodleHash(seed + 5.0) * 6.2831853;
    return sin(t * freqA + phaseA) * 0.65 + sin(t * freqB + phaseB) * 0.35;
  }

  vec3 doodleWobble(vec3 pos, vec3 normal) {
    float snappedTime = floor(uTime * uSnapRate) / uSnapRate;
    float n = doodleCrawl(pos * 12.0, snappedTime) * 0.5;
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

// flat toon shading: hard-stepped bands instead of smooth lighting. White
// covers most of the surface; the two accent colors only show up as tight
// highlight bands near-facing the light, not a blended gradient between them
const FILL_FRAGMENT = /* glsl */ `
  uniform vec3 uBaseColor;
  uniform vec3 uHighlightPurple;
  uniform vec3 uHighlightBlue;
  uniform vec3 uLightDir;
  varying vec3 vNormal;

  void main() {
    float ndotl = max(dot(normalize(vNormal), uLightDir), 0.0);
    // thin smoothstep transition at each band edge instead of a hard cutoff,
    // so the boundary anti-aliases instead of staircasing pixel by pixel
    float purpleMix = smoothstep(0.79, 0.81, ndotl);
    float blueMix = smoothstep(0.91, 0.93, ndotl);
    vec3 color = mix(uBaseColor, uHighlightPurple, purpleMix);
    color = mix(color, uHighlightBlue, blueMix);
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
  uniform vec3 uOutlineColor;

  void main() {
    gl_FragColor = vec4(uOutlineColor, 1.0);
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
  outlineColor: THREE.Color,
  baseColor: THREE.Color,
  highlightPurple: THREE.Color,
  highlightBlue: THREE.Color,
): DoodleMaterials {
  const lightDir = new THREE.Vector3(2, 2, 3).normalize();

  const fill = new THREE.ShaderMaterial({
    vertexShader: FILL_VERTEX,
    fragmentShader: FILL_FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uSnapRate: { value: SNAP_RATE },
      uJitterAmp: { value: JITTER_AMPLITUDE },
      uBaseColor: { value: baseColor },
      uHighlightPurple: { value: highlightPurple },
      uHighlightBlue: { value: highlightBlue },
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
      uOutlineColor: { value: outlineColor },
    },
    side: THREE.BackSide,
  });

  return { fill, outline };
}
