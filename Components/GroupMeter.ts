import { Meter } from '../Types/Type';

export interface Section {
  title: string;
  data: Meter[];
}

export const groupMeters = (meters: Meter[]): Section[] => {
  const filterProductIds = (meters: Meter[], ids: string[]) =>
    meters.filter((meter) => ids.includes(meter.ProductCode));

  return [
    {
      title: 'Fjärrvärme',
      data: filterProductIds(meters, ['FJV', 'fjv']),
    },
    {
      title: 'El',
      data: filterProductIds(meters, ['EL', 'El']),
    },
    {
      title: 'Fjärrkyla',
      data: filterProductIds(meters, ['FJK', 'fjk']),
    },
    {
      title: 'Vatten',
      data: filterProductIds(meters, ['VAT', 'vat']),
    },
    {
      title: 'Effekt',
      data: filterProductIds(meters, ['Effekt', 'effekt']),
    },
    {
      title: 'Flöde',
      data: filterProductIds(meters, ['Flöde', 'flöde']),
    },
    {
      title: 'Temperatur',
      data: filterProductIds(meters, ['TMP', 'tmp']),
    },
    {
      title: 'Volym',
      data: filterProductIds(meters, ['VOL', 'vol']),
    },
    {
      title: 'Olja',
      data: filterProductIds(meters, ['Olja, olja']),
    },
    {
      title: 'Fjärrvärme sek',
      data: filterProductIds(meters, ['FJV sek', 'fjv sek']),
    },
    {
      title: 'El sek',
      data: filterProductIds(meters, ['EL sek', 'El sek', 'el sek']),
    },
    {
      title: 'Fjärrkyla sek',
      data: filterProductIds(meters, ['FJK sek', 'fjk sek']),
    },
    {
      title: 'Vatten sek',
      data: filterProductIds(meters, ['VAT sek', 'vat sek']),
    },
    {
      title: 'Fjärrvärme under',
      data: filterProductIds(meters, ['FJV under', 'fjv under']),
    },
    {
      title: 'El under',
      data: filterProductIds(meters, ['EL under', 'el under']),
    },
    {
      title: 'Fjärrkyla under',
      data: filterProductIds(meters, ['FJK under', 'fjk under']),
    },
    {
      title: 'Vatten under',
      data: filterProductIds(meters, ['VAT under', 'vat under']),
    },
    {
      title: 'NN',
      data: filterProductIds(meters, ['NN', 'nn']),
    },
    {
      title: 'Fjärrvärme Virtuell',
      data: filterProductIds(meters, ['FJV virtuell', 'fjv virtuell']),
    },
    {
      title: 'El Virtuell',
      data: filterProductIds(meters, ['EL virtuell', 'el virtuell']),
    },
    {
      title: 'Industriellt Vatten',
      data: filterProductIds(meters, ['VAT ind', 'industriellt vatten']),
    },
    {
      title: 'BSK',
      data: filterProductIds(meters, ['bsk']),
    },
    {
      title: 'Utetemperatur',
      data: filterProductIds(meters, ['utetemperatur']),
    },
    {
      title: 'Fjärrvärme Effekt',
      data: filterProductIds(meters, ['FJV Effekt', 'fjv effekt']),
    },
    {
      title: 'El Effekt',
      data: filterProductIds(meters, ['EL Effekt', 'el effekt']),
    },
    {
      title: 'Övrigt',
      data: meters.filter(
        (meter) =>
          ![
            'FJV',
            'fjv',
            'EL',
            'El',
            'el',
            'FJK',
            'fjk',
            'VAT',
            'vat',
            'Effekt',
            'effekt',
            'Flöde',
            'flöde',
            'TMP',
            'tmp',
            'VOL',
            'vol',
            'Olja',
            'olja',
            'FJV sek',
            'fjv sek',
            'EL sek',
            'el sek',
            'FJK sek',
            'fjk sek',
            'VAT sek',
            'vat sek',
            'FJV Effekt',
            'FJV under',
            'fjv under',
            'EL under',
            'el under',
            'FJK under',
            'fjk under',
            'VAT under',
            'vat under',
            'NN',
            'nn',
          ].includes(meter.ProductCode),
      ),
    },
  ].filter((section) => section.data.length > 0);
};
