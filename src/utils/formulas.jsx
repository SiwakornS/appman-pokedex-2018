import { exactDigit } from './helpers';

export const calculateHP = hp => ((hp > 100) ? 100 : hp);

export const sum = (p, c) => p + c;

// eslint-disable-next-line max-len
export const calculateWeakness = (weaknesses = []) => weaknesses.map(weakness => (((+exactDigit(weakness.value) * 100) === 100) ? 100 : 0)).reduce(sum, 0);

export const calculateDamage = (attacks = []) => attacks.map((attack) => {
  attack.damage = attack.damage || 0;
  return +exactDigit(attack.damage) * 50;
}).reduce(sum, 0);

// eslint-disable-next-line max-len
export const calculateHappiness = (hp, damage, weak) => ((hp / 10) + (damage / 10) + (10 - (weak))) / 5;

export default {
  calculateDamage,
  calculateHP,
  calculateHappiness,
  calculateWeakness,
};
