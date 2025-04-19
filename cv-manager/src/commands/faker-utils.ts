import {
  randFirstName,
  randLastName,
  randNumber,
  randJobTitle,
  randFilePath,
} from '@ngneat/falso';

export function createFakeCVs(count: number) {
  return Array.from({ length: count }, () => ({
    name: randLastName(),
    firstname: randFirstName(),
    age: randNumber({ min: 18, max: 60 }),
    cin: randNumber({ min: 10000000, max: 99999999 }).toString(),
    job: randJobTitle(),
    path: 'cv/' + randFilePath(),
  }));
}
