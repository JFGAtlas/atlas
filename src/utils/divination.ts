import { Solar } from 'lunar-javascript';

export interface DivinationResult {
  bazi: string;
  wuxing: string;
  characterAnalysis: string;
  fourBooksAnalysis: string;
  overallFortune: string;
}

const FIVE_ELEMENTS = ['金', '木', '水', '火', '土'];
const TEN_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const TWELVE_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// Simple deterministic hash based on a string
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; 
  }
  return Math.abs(hash);
}

export function performDivination(name: string, year: number, month: number, day: number, hour: number, testChar: string): DivinationResult {
  // 1. Calculate Bazi
  const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0);
  const lunar = solar.getLunar();
  const baZi = lunar.getEightChar();
  
  const baziString = `${baZi.getYear()} ${baZi.getMonth()} ${baZi.getDay()} ${baZi.getTime()}`;
  const wuxingString = `${baZi.getYearWuXing()} ${baZi.getMonthWuXing()} ${baZi.getDayWuXing()} ${baZi.getTimeWuXing()}`;
  
  // 2. Character Analysis (Plum Blossom approach combined with hash)
  const charHash = simpleHash(testChar);
  const hexagramIndex = charHash % 64;
  
  const charInterpretations = [
    `“${testChar}”字暗藏玄机。从字形来看，此字笔画之中透露出一种向上的升腾之气。结合您的八字，近期在事业或学业上将有突破。`,
    `您测的“${testChar}”字，五行流转。此字结构稳固，暗示着当前生活需要沉淀与积累。不可急于求成，宜稳扎稳打。`,
    `“${testChar}”字之中，隐有波澜。近期人际关系可能会面临一些考验，需以和为贵，切忌意气用事。八字中亦显露出相关迹象。`,
    `细观“${testChar}”字，通透豁达。此字预示着困扰您许久的疑难即将解开，贵人运渐旺，顺风顺水之象。`
  ];
  const charAnalysis = charInterpretations[charHash % charInterpretations.length];

  // 3. Four Books Analysis (Simulated based on Bazi Day Master)
  const dayMaster = baZi.getDayGan();
  let fourBooksText = '';
  
  // Pseudo-logic based on Day Master
  if (['甲', '乙'].includes(dayMaster)) {
    fourBooksText = `《滴天髓》云：“甲木参天，脱胎要火。” 您的日主属木，结合当前流年，木赖水生，水多木漂。因此，需注意五行平衡，以土培根，以火发荣。适宜从事教育、文化等行业。`;
  } else if (['丙', '丁'].includes(dayMaster)) {
    fourBooksText = `《渊海子平》论火：“丙火猛烈，欺霜侮雪。” 您的命局以火为主，热情奔放。然火旺易焚，需以水济之。今年流运中，需注意情绪控制，方可大展宏图。`;
  } else if (['戊', '己'].includes(dayMaster)) {
    fourBooksText = `《三命通会》载：“戊土固重，既中且正。” 日元属土，主信。性格沉稳厚重。结合测字，显示您当前正处于一个关键的蓄力期，厚积方能薄发。`;
  } else if (['庚', '辛'].includes(dayMaster)) {
    fourBooksText = `《穷通宝鉴》言：“庚金带煞，刚健为最。” 金主义，主刚毅。您的八字透出一股肃杀之气，决断力极强。但在处理人情世故时，宜外圆内方，避免过刚易折。`;
  } else {
    fourBooksText = `《滴天髓》云：“壬水通河，能泄金气。” 日主为水，聪颖机智，随遇而安。命局中水势浩荡，顺之则吉。结合“${testChar}”字，今年宜动不宜静，在变动中寻求机遇。`;
  }

  // 4. Overall Fortune
  const overallScores = [
    '大吉，紫气东来，万事胜意。',
    '中吉，平步青云，渐入佳境。',
    '小吉，平平淡淡才是真，偶有小喜。',
    '平吉，需谨言慎行，守成方吉。'
  ];
  const overallIndex = (simpleHash(name) + charHash) % 4;

  return {
    bazi: baziString,
    wuxing: wuxingString,
    characterAnalysis: charAnalysis,
    fourBooksAnalysis: fourBooksText,
    overallFortune: overallScores[overallIndex]
  };
}
