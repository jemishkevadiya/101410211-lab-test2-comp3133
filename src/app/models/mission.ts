export interface Launch {
    flight_number: number;
    name: string;
    date_utc: string;
    details: string;
    rocket: {
      name: string;
      type: string;
    };
    links: {
      patch: {
        small: string;
      };
      article: string;
      wikipedia: string;
      webcast: string;
    };
    id: string;
  }