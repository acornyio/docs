/** @resolution */
uniform vec2 u_resolution;

/**
 * @label Dot Color
 * @color
 * @default #1A1A1E
 */
uniform vec3 u_color;

/**
 * @label Max Opacity
 * @range 0.0, 0.2
 * @default 0.05
 */
uniform float u_opacity;

void main() {
  vec2 cell = mod(gl_FragCoord.xy, 40.0);
  vec2 d = min(cell, 40.0 - cell);
  float dist = length(d);
  float dot = 1.0 - smoothstep(0.6, 1.6, dist);

  vec2 uv = gl_FragCoord.xy / u_resolution;
  float nx = (uv.x - 0.5) * (u_resolution.x / 900.0);
  float ny = (1.0 - uv.y) * (u_resolution.y / 700.0);
  float topDist = length(vec2(nx, ny));
  float mask = 1.0 - smoothstep(0.12, 0.74, topDist);

  float a = dot * mask * u_opacity;
  gl_FragColor = vec4(u_color, a);
}
