export const MSG_VM = {
  ALREADY_REGISTERED: 'Le véhicule &s est déjà enregistré !',
  UNDEFINED_VEHICLE: 'Le véhicule &s est introuvable !',
  SAME_LOCATION: 'La localisation du véhicule &s est identique à la précendente !',
};

export const MSG_FM = {
  ALREADY_REGISTERED: "Le parc &s est déjà enregistré où contient les mêmes coordonées GPS d'un autre parc",
  UNDEFINED_FLEET: 'Le parc &s est introuvable !',
};

export const MSG_F = {
  VEHICLE_ALREADY_PARKED: 'Le véhicule &s est déjà enregistré dans le parc &s',
};

export const MSG_TEST = {
  ERROR_DURING_VEHICLE_CREATION: 'Impossible de créer le vehicle (undefined)',
  ERROR_DURING_FLEET_CREATION: 'Impossible de créer le parc (undefined)',
  VEHICLE_REGISTERED_TWICE: 'Le véhicule &s a été assigné au parc &s à plusieurs reprises !',
  FLEETS_ARE_NOT_ALL_PRESENTS: "Le véhicule &s n'est pas correctement assigné aux parcs prédéfinis &s et &s !",
  NOT_THE_SAME_LOCATION: "Le véhicule &s n'est pas à la localisation qu'il devrait &s",
};

export const MSG_CLI = {
  ERROR_INIT: "Erreur pendant l'initialisation de l'application...",
  ASK_ACTION: 'Que souhaitez-vous faire ?',
  ASK_LAT: 'Veuillez renseigner la lattitude :',
  ASK_LNG: 'Veuillez renseigner la longitude :',
  ASK_ALT: "Veuillez renseigner l'altitude (optionelle) :",
  NAN: 'Veuillez entrer un nombre valide !',
  NAN_OPTIONAL: 'Veuillez entrer un nombre valide ou laisser vide !',
  FLEET_CREATED: '=> Parc enregistré !',
  FLEET_ID: 'ID : &s',
  FLEET_GPS: 'GPS : &s',
  FLEET_COPY_TO_CLIPBOARD: 'Identifiant du parc copié dans votre clipboard',
  FLEET_VEHICLES: 'Véhicules enregistrés :',
  ASK_FLEET_ID: 'Veuillez renseigner le numéro du parc où assigner le véhicule :',
  ASK_PLATE: 'Veuillez renseigner le numéro de plaque du véhicule :',
  LOCATE_SUCESS: '=> Localisation du véhicule &s est &s, il se trouve dans le parc &s',
  LOCATE_ERROR: '=> Aucune localisation correcte trouvé pour le véhicule &s',
  LOCATE_ERROR_NO_FLEET_FOUND: '=> Aucun parc trouvé avec la localisation &s du véhicule &s',
  CONSULT_FLEET: '=> Parcs enregistrés :',
  CONSULT_VEHICLE: '=> Véhicules enregistrés :',
};
