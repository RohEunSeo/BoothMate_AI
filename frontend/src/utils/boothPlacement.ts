// src/utils/boothPlacement.ts
import { Company } from "./parseCompanyCSV";

// ✅ 기존 Booth 타입 + color만 추가
export interface Booth {
  id: string;
  companyId: string;
  companyName: string;
  field: string;
  position: { x: number; z: number }; // 3D 위치
  color: string; // ✅ 추가: 색상
}

// ✅ hue 값 후보들 (색상 계열)
const hueCandidates = [0, 30, 60, 120, 180, 210, 270, 300];
const fieldHueMap = new Map<string, number>();
const usedHues = new Set<number>();

// ✅ 새로운 분야에 hue 할당
const getUniqueHue = (): number => {
  const available = hueCandidates.filter(h => !usedHues.has(h));
  const hue = available[Math.floor(Math.random() * available.length)] || 0;
  usedHues.add(hue);
  return hue;
};

// ✅ 분야 내 기업 index에 따라 채도+밝기 조절
const getColorByIndex = (hue: number, index: number, total: number): string => {
  const saturation = 80 - (index / total) * 30;  // 채도: 80% → 50%
  const lightness = 40 + (index / total) * 30;   // 밝기: 40% → 70%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export function generateBoothPlacement(companies: Company[]): Booth[] {
  const fieldGroups = new Map<string, Company[]>();
  companies.forEach(c => {
    if (!fieldGroups.has(c.field)) fieldGroups.set(c.field, []);
    fieldGroups.get(c.field)!.push(c);
  });

  const booths: Booth[] = [];
  let startZ = 0;

  for (const [field, comps] of fieldGroups) {
    // 분야 hue 정하기
    if (!fieldHueMap.has(field)) {
      fieldHueMap.set(field, getUniqueHue());
    }
    const hue = fieldHueMap.get(field)!;
    const totalCompanies = comps.length;

    let startX = 0;
    for (let cIdx = 0; cIdx < comps.length; cIdx++) {
      const comp = comps[cIdx];
      const color = getColorByIndex(hue, cIdx, totalCompanies); // 기업별 색

      for (let i = 0; i < comp.boothCount; i++) {
        booths.push({
          id: `${comp.id}_B${i + 1}`,
          companyId: comp.id,
          companyName: comp.name,
          field,
          color,
          position: { x: startX + i * 2, z: startZ }
        });
      }

      startX += comp.boothCount * 2 + 2;
    }

    startZ += 3;
  }

  return booths;
}
