export const DEV_MODE = import.meta.env.DEV;

export const SHOW_TOP = 5;
export const TAP_POWER = 10;
export const NB_TAP_NEEDED_PER_USER = 100;
export const ENABLE_BLOWING = false;
export const ENABLE_TAPPING = true;
export const ENABLE_SWIPING = false;
export const ENABLE_SHAKING = false;
export const IS_TOUCH_DEVICE = 'ontouchstart' in window;
export const RACE_MAP_IMAGE = 'dod-race-map.jpg';
export const SANTI_MASCOT_IMAGE = 'santi.png';

// Team racer sprites (Santi mascot variants)
export const TEAMS_CONFIG = [
  {
    name: 'Blue Team',
    car: 'santi-nebula',
    color: '#007bff',
  },
  {
    name: 'Red Team',
    car: 'santi-orbita',
    color: '#dc3545',
  },
];

export const TEAM_LABELS_ES = ['Tripulación Nebula', 'Tripulación Órbita'];
