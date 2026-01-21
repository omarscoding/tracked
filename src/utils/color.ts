/**
 * Generate intensity color based on base color and level (0-4)
 * Used for heatmap cells
 */
export function getIntensityColor(
  baseColor: string,
  intensity: 0 | 1 | 2 | 3 | 4
): string {
  if (intensity === 0) return '#ebedf0';

  const lightnessMap: Record<number, number> = {
    1: 0.75,
    2: 0.5,
    3: 0.25,
    4: 0,
  };

  return adjustColorLightness(baseColor, lightnessMap[intensity]);
}

/**
 * Adjust color lightness by blending with white
 */
function adjustColorLightness(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const blend = (channel: number) =>
    Math.round(channel + (255 - channel) * factor);

  const newR = blend(r);
  const newG = blend(g);
  const newB = blend(b);

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Get a semi-transparent version of a color
 */
export function withOpacity(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
