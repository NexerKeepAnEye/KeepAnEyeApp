import { Meter } from '../Types/Type';

export interface Section {
  title: string;
  data: Meter[];
}
//prettier-ignore
const productCodeMap: { [key: string]: string[] } = {
  'Fjärrvärme': ['FJV',],
  'El': ['EL',  ],
  'Fjärrkyla': ['FJK',],
  'Vatten': ['VAT', ],
  'Effekt': ['Effekt',],
  'Flöde': ['Flöde', ],
  'Temperatur': ['TMP',],
  'Volym': ['VOL', ],
  'Olja': ['Olja', ],
  'Fjärrvärme sek': ['FJV sek', ],
  'El sek': ['EL sek', ],
  'Fjärrkyla sek': ['FJK sek',],
  'Vatten sek': ['VAT sek', ],
  'Fjärrvärme under': ['FJV under',],
  'El under': ['EL under', ],
  'Fjärrkyla under': ['FJK under',],
  'Vatten under': ['VAT under', ],
  'NN': ['NN', ],
  'Fjärrvärme Virtuell': ['FJV virtuell',],
  'El Virtuell': ['EL virtuell', ],
  'Industriellt Vatten': ['VAT ind', ],
  'BSK': ['bsk'],
  'Utetemperatur': ['utetemperatur'],
  'Fjärrvärme Effekt': ['FJV Effekt', ],
  'El Effekt': ['EL Effekt', ],
};

export const groupMeters = (meters: Meter[]): Section[] => {
  const filterProductIds = (meters: Meter[], ids: string[]) =>
    meters.filter((meter) =>
      ids.some((id) => id.toLowerCase() === meter.ProductCode.toLowerCase()),
    );

  let sections = Object.entries(productCodeMap).map(([title, ids]) => ({
    title,
    data: filterProductIds(meters, ids),
  }));

  const otherMeters = meters.filter(
    (meter) =>
      !Object.values(productCodeMap)
        .flat()
        .some((id) => id.toLowerCase() === meter.ProductCode.toLowerCase()),
  );

  if (otherMeters.length > 0) {
    sections.push({ title: 'Övrigt', data: otherMeters });
  }

  sections = sections.filter((section) => section.data.length > 0);
  sections.sort((a, b) => a.title.localeCompare(b.title));
  sections.forEach((section) => {
    section.data.sort((a, b) => a.Name.localeCompare(b.Name));
  });

  return sections;
};
