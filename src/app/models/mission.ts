export interface Launch {
    flight_number: number;
    name: string;
    date_utc: string;
    details: string;
    success: boolean;
    cores: { landing_success: boolean | null }[];
    rocket: string; 
    launchpad: string; 
    links: {
      patch: {
        small: string;
      };
      article: string;
      wikipedia: string;
      webcast: string;
      youtube_id?: string; 
    };
    id: string;
  }