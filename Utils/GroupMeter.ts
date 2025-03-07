import { Meter } from '../Types/Type';

export interface Section {
  title: string;
  data: Meter[];
}
//prettier-ignore
const productCodeMap: { [key: string]: string[] } = {
  'Fjärrvärme': ['FJV', 'fjv'],
  'El': ['EL', 'El'],
  'Fjärrkyla': ['FJK', 'fjk'],
  'Vatten': ['VAT', 'vat'],
  'Effekt': ['Effekt', 'effekt'],
  'Flöde': ['Flöde', 'flöde'],
  'Temperatur': ['TMP', 'tmp'],
  'Volym': ['VOL', 'vol'],
  'Olja': ['Olja', 'olja'],
  'Fjärrvärme sek': ['FJV sek', 'fjv sek'],
  'El sek': ['EL sek', 'El sek', 'el sek'],
  'Fjärrkyla sek': ['FJK sek', 'fjk sek'],
  'Vatten sek': ['VAT sek', 'vat sek'],
  'Fjärrvärme under': ['FJV under', 'fjv under'],
  'El under': ['EL under', 'el under'],
  'Fjärrkyla under': ['FJK under', 'fjk under'],
  'Vatten under': ['VAT under', 'vat under'],
  'NN': ['NN', 'nn'],
  'Fjärrvärme Virtuell': ['FJV virtuell', 'fjv virtuell'],
  'El Virtuell': ['EL virtuell', 'el virtuell'],
  'Industriellt Vatten': ['VAT ind', 'industriellt vatten'],
  'BSK': ['bsk'],
  'Utetemperatur': ['utetemperatur'],
  'Fjärrvärme Effekt': ['FJV Effekt', 'fjv effekt'],
  'El Effekt': ['EL Effekt', 'el effekt'],
};

export const groupMeters = (meters: Meter[]): Section[] => {
  const filterProductIds = (meters: Meter[], ids: string[]) =>
    meters.filter((meter) => ids.includes(meter.ProductCode));

  const sections = Object.entries(productCodeMap).map(([title, ids]) => ({
    title,
    data: filterProductIds(meters, ids),
  }));

  const otherMeters = meters.filter(
    (meter) =>
      !Object.values(productCodeMap).flat().includes(meter.ProductCode),
  );

  if (otherMeters.length > 0) {
    sections.push({ title: 'Övrigt', data: otherMeters });
  }

  return sections.filter((section) => section.data.length > 0);
};
