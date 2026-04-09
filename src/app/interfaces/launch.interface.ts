// src/app/interfaces/launch.interface.ts

export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface Links {
  mission_patch: string | null;
  mission_patch_small: string | null;
  article_link: string | null;
  wikipedia: string | null;
  video_link: string | null;
}

export interface LaunchSite {
  site_id: string;
  site_name: string;
  site_name_long: string;
}

export interface Launch {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: string;
  launch_date_local: string;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window: number | null;
  rocket: Rocket;
  ships: string[];
  telemetry: { flight_club: string | null };
  launch_site: LaunchSite;
  launch_success: boolean | null;
  launch_failure_details?: {
    time: number;
    altitude: number | null;
    reason: string;
  };
  links: Links;
  details: string | null;
  upcoming: boolean;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
}
