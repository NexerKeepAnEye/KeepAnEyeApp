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
      data: filterProductIds(meters, [25,]),
    },
    {
      title: 'El',
      data: filterProductIds(meters, [26,]),
    },
    {
      title: 'Fjärrkyla',
      data: filterProductIds(meters, [27, ]),
    },
    {
      title: 'Vatten',
      data: filterProductIds(meters, [28, 426, ]),
    },
    {
      title: 'Effekt',
      data: filterProductIds(meters, [29, ]),
    },
    {
      title: 'Flöde',
      data: filterProductIds(meters, [30, ]),
    },
    {
      title: 'Temperatur',
      data: filterProductIds(meters, [31, 32]),
    },
    {
      title: 'Volym',
      data: filterProductIds(meters, [33, ]),
    },
    {
      title: 'Olja',
      data: filterProductIds(meters, []),
    },
    {
      title: 'Fjärrvärme sek',
      data: filterProductIds(meters, [63]),
    },
    {
      title: 'El sek',
      data: filterProductIds(meters, [64]),
    },
    {
      title: 'Fjärrkyla sek',
      data: filterProductIds(meters, [65]),
    },
    {
      title: 'Vatten sek',
      data: filterProductIds(meters, [66]),
    },
    {
      title: 'Fjärrvärme under',
      data: filterProductIds(meters, [67, ]),
    },
    {
      title: 'El under',
      data: filterProductIds(meters, [68, ]),
    },
    {
      title: 'Fjärrkyla under',
      data: filterProductIds(meters, [69, ]),
    },
    {
      title: 'Vatten under',
      data: filterProductIds(meters, [70, ]),
    },
    {
      title: 'NN',
      data: filterProductIds(meters, []),
    },
    {
      title: 'Fjärrvärme Virtuell',
      data: filterProductIds(meters, []),
    },
    {
      title: 'El Virtuell',
      data: filterProductIds(meters, []),
    },
    {
      title: 'Industriellt Vatten',
      data: filterProductIds(meters, [426]),
    },
    {
      title: 'BSK',
      data: filterProductIds(meters, []),
    },
    {
      title: 'Utetemperatur',
      data: filterProductIds(meters, []),
    },
    {
      title: 'Fjärrvärme Effekt',
      data: filterProductIds(meters, [505]),
    },
    {
      title: 'El Effekt',
      data: filterProductIds(meters, [506]),
    },
    {
      title: 'Övrigt',
      data: meters.filter(
        (meter) =>
          ![
            22, 23, 24, 34, 35, 36, 37, 38,
            39, 71, 72, 305, 306,449, 476
          ].includes(meter.ProductId),
      ),
    },
  ].filter((section) => section.data.length > 0);
};
