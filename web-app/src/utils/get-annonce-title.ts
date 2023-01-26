import { Annonce } from "../api";

export function getAnnonceTitle(item: Annonce) {
  return `${item.location} - ${item.surface}m² - s+${item.roomsNumber}`;
}
