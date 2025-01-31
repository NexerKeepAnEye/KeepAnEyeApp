import { Meter } from '../Types/Type';

export interface Section {
  title: string;
  data: Meter[];
}

export const groupMeters = (meters: Meter[]): Section[] => {
  const filterProductIds = (meters: Meter[], ids: number[]) =>
    meters.filter((meter) => ids.includes(meter.ProductId));

  return [
    {
      title: 'Fjärrvärme',
      data: filterProductIds(meters, [22]),
    },
    {
      title: 'El',
      data: filterProductIds(meters, [23]),
    },
    {
      title: 'Fjärrkyla',
      data: filterProductIds(meters, [24, 67]),
    },
    {
      title: 'Vatten',
      data: filterProductIds(meters, [25]),
    },
    {
      title: 'Effekt',
      data: filterProductIds(meters, [26]),
    },
    {
      title: 'Flöde',
      data: filterProductIds(meters, [27]),
    },
    {
      title: 'Temperatur',
      data: filterProductIds(meters, [28, 29]),
    },
    {
      title: 'Volym',
      data: filterProductIds(meters, [30]),
    },
    {
      title: 'Olja',
      data: filterProductIds(meters, [31]),
    },
    {
      title: 'Fjärrvärme sek',
      data: filterProductIds(meters, [32]),
    },
    {
      title: 'El sek',
      data: filterProductIds(meters, [33]),
    },
    {
      title: 'Fjärrkyla sek',
      data: filterProductIds(meters, [34]),
    },
    {
      title: 'Vatten sek',
      data: filterProductIds(meters, [35]),
    },
    {
      title: 'Fjärrvärme under',
      data: filterProductIds(meters, [36]),
    },
    {
      title: 'El under',
      data: filterProductIds(meters, [37]),
    },
    {
      title: 'Fjärrkyla under',
      data: filterProductIds(meters, [38]),
    },
    {
      title: 'Vatten under',
      data: filterProductIds(meters, [39]),
    },
    {
      title: 'NN',
      data: filterProductIds(meters, [66]),
    },
    {
      title: 'Fjärrvärme Virtuell',
      data: filterProductIds(meters, [68]),
    },
    {
      title: 'El Virtuell',
      data: filterProductIds(meters, [69]),
    },
    {
      title: 'Industriellt Vatten',
      data: filterProductIds(meters, [70]),
    },
    {
      title: 'BSK',
      data: filterProductIds(meters, [71]),
    },
    {
      title: 'Utetemperatur',
      data: filterProductIds(meters, [72]),
    },
    {
      title: 'Fjärrvärme Effekt',
      data: filterProductIds(meters, [305]),
    },
    {
      title: 'El Effekt',
      data: filterProductIds(meters, [306]),
    },
    {
      title: 'Övrigt',
      data: meters.filter(
        (meter) =>
          ![
            22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
            39, 66, 67, 68, 69, 70, 71, 72, 305, 306,
          ].includes(meter.ProductId),
      ),
    },
  ].filter((section) => section.data.length > 0);
};
