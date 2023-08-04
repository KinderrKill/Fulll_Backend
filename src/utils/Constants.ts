export const CLI_CHOICE = {
  CREATE_FLEET: {
    name: '1] Créer un nouveau parc',
    value: 'createFleet',
  },
  REGISTER_VEHICLE: {
    name: '2] Enregistrer un véhicule',
    value: 'registerVehicle',
  },
  LOCATE_VEHICLE: {
    name: '3] Localiser un véhicule',
    value: 'locateVehicle',
  },
  CONSULT_DATA: {
    name: '4] Consulter les données',
    value: 'consultData',
  },
};

const KEY_CODE = '&s';

export function getErrorMessage(message: string, keys?: string[] | string): string {
  return `🚩 | ${getConvertedMessage(message, keys)}`;
}

export function NewMessage(message: string, keys?: string[] | string): void {
  console.log('[Message] 💬 |', getConvertedMessage(message, keys));
}

export function getConvertedMessage(message: string, keys?: string[] | string): string {
  let convertedMessage = message;

  if (Array.isArray(keys)) {
    for (let i = 0; i < keys.length; i++) {
      convertedMessage = convertedMessage.replace(KEY_CODE, keys[i] || 'UNDEFINED');
    }
  } else {
    convertedMessage = convertedMessage.replace(KEY_CODE, keys || 'UNDEFINED');
  }

  return convertedMessage;
}
