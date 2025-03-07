import { useAccessibilityStore } from '../stores/accessibilityStore';

// Map of complex terms to simpler alternatives
const simplificationMap: Record<string, string> = {
  // Scientific terms
  "titration": "mixing liquids to find amounts",
  "acid-base": "sour-neutral",
  "chemical reaction": "substance change",
  "molecule": "tiny particle",
  "hypothesis": "educated guess",
  "experiment": "test",
  "laboratory": "science room",
  "solution": "liquid mixture",
  "concentration": "strength",
  "equilibrium": "balance",
  "catalyst": "speed-up substance",
  "compound": "combined substance",
  "element": "basic substance",
  "precipitate": "solid that forms",
  "oscillation": "back and forth movement",
  "frequency": "how often something happens",
  "amplitude": "size of movement",
  "pendulum": "hanging weight",
  "gravity": "pulling force",
  "friction": "rubbing resistance",
  "velocity": "speed in a direction",
  "acceleration": "change in speed",
  "momentum": "moving force",
  "inertia": "resistance to change",
  "trajectory": "path of movement",
  "dna extraction": "getting dna out",
  "cellular": "related to cells",
  "genome": "complete set of genes",
  "chromosome": "dna package",
  "nucleotide": "dna building block",
  "protein": "body building block",
  "enzyme": "helper molecule",
  "photosynthesis": "making food from light",
  "respiration": "using oxygen for energy",
  "mitosis": "cell division",
  "osmosis": "water movement through membranes",
  "diffusion": "spreading out",
  
  // Educational terms
  "curriculum": "learning plan",
  "assessment": "test",
  "evaluation": "checking progress",
  "pedagogy": "teaching method",
  "cognitive": "thinking-related",
  "metacognition": "thinking about thinking",
  "differentiation": "adapting to different learners",
  "scaffolding": "learning support",
  "formative": "ongoing",
  "summative": "final",
  "objective": "goal",
  "criterion": "standard",
  "rubric": "scoring guide",
  
  // Technical terms
  "algorithm": "step-by-step process",
  "variable": "changeable value",
  "function": "set of instructions",
  "parameter": "input value",
  "iteration": "repetition",
  "interface": "connection point",
  "database": "information storage",
  "query": "question to database",
  "syntax": "language rules",
  "compiler": "code translator",
  "debugging": "fixing problems",
  "encryption": "secret coding",
  "authentication": "proving identity",
  "bandwidth": "data capacity",
  "latency": "delay time",
  "protocol": "communication rules",
  "server": "central computer",
  "client": "user's computer",
  "cache": "temporary storage",
  "API": "connection method",
};

/**
 * Simplifies text by replacing complex terms with simpler alternatives
 * @param text The text to simplify
 * @returns Simplified text
 */
export const simplifyText = (text: string): string => {
  if (!text) return text;
  
  let simplifiedText = text;
  
  // Replace complex terms with simpler alternatives
  Object.entries(simplificationMap).forEach(([complex, simple]) => {
    // Create a regular expression that matches the complex term as a whole word
    // with case insensitivity
    const regex = new RegExp(`\\b${complex}\\b`, 'gi');
    simplifiedText = simplifiedText.replace(regex, simple);
  });
  
  return simplifiedText;
};

/**
 * A React hook that simplifies text based on the user's accessibility preferences
 * @param text The text to potentially simplify
 * @returns Simplified or original text based on user preferences
 */
export const useSimplifiedText = (text: string): string => {
  const { simplifiedLanguage } = useAccessibilityStore();
  
  if (!simplifiedLanguage || !text) {
    return text;
  }
  
  return simplifyText(text);
}; 