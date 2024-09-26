export function formatArrToString(input: string[] | string): string {
    let array: string[] = [];
    if (typeof input === 'string' && input.startsWith('[') && input.endsWith(']')) {
      // Parse the stringified array
      try {
        array = JSON.parse(input);
      } catch (error) {
        console.error('Invalid stringified array:', error);
        return 'Invalid input'; // Or handle the error differently
      }
    } else if (Array.isArray(input)) {
      // Input is already an array
      array = input;
    } else {
      console.error('Input is not an array or stringified array');
      return 'Invalid input'; // Or handle the error differently
    }
//   let result:string = array.map((element, index) =>` В${index + 1}: ${element}`).join('; ');
    // Now you have a valid array (either parsed or the original)
    return array.map((element, index) =>` В${index + 1}: ${element}`).join('; ');
  }