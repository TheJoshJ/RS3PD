import { getSkillName } from "@/utils/getSkillName";

export const getSkillImage = (skillId: number): string => {
  const skillName = getSkillName(skillId);
  if (!skillName) {
    throw new Error(`Invalid skill ID: ${skillId}`);
  }

  return `/skills/${skillName.toLowerCase()}.png`;
};
