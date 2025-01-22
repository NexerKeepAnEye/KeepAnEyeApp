import { Premise, Meter } from '../Types/Type'; // Anta att dina typer är definierade här

export function parseJsonToPremises(jsonString: string): Premise[] {
  try {
    // 1. Parse JSON-strängen till ett JavaScript-objekt
    const data = JSON.parse(jsonString);

    // 2. Validera/mappa om nödvändigt (exempel här antar att data är korrekt)
    return data as Premise[]; // Typecastar direkt, om du vet att datan är rätt
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return []; // Returnera en tom array vid fel
  }
}

export function parseJsonToPremisesWithValidation(jsonString: string): Premise[] {
  try {
    const data = JSON.parse(jsonString);

    // Validera och mappa datan
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: Expected an array');
    }

    return data.map((item: any): Premise => ({
      Id: item.Id,
      Designation: item.Designation ?? null, // Sätter till null om undefined
      Name: item.Name,
      Meters: (item.Meters || []).map((meter: any): Meter => ({
        Id: meter.Id,
        Name: meter.Name,
        ProductId: meter.ProductId,
        ProductCode: meter.ProductCode,
      })),
    }));
  } catch (error) {
    console.error('Error parsing or validating JSON:', error);
    return []; // Returnera en tom array vid fel
  }
}