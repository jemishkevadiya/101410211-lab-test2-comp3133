import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Launch } from '../models/mission';

interface Rocket {
  id: string;
  name: string;
  type: string;
}

interface Launchpad {
  id: string;
  name: string;
}

export interface TransformedLaunch extends Omit<Launch, 'rocket' | 'launchpad'> {
  rocket: { name: string; type: string };
  launchpad: { name: string };
}

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {
  private launchesUrl = 'https://api.spacexdata.com/v4/launches';
  private queryUrl = 'https://api.spacexdata.com/v4/launches/query';
  private rocketsUrl = 'https://api.spacexdata.com/v4/rockets';
  private launchpadsUrl = 'https://api.spacexdata.com/v4/launchpads';

  constructor(private http: HttpClient) { }

  private getRocket(rocketId: string): Observable<Rocket> {
    return this.http.get<Rocket>(`${this.rocketsUrl}/${rocketId}`).pipe(
      map(rocket => ({
        id: rocket.id,
        name: rocket.name || 'Unknown',
        type: rocket.type || 'Unknown'
      }))
    );
  }

  private getLaunchpad(launchpadId: string): Observable<Launchpad> {
    return this.http.get<Launchpad>(`${this.launchpadsUrl}/${launchpadId}`).pipe(
      map(launchpad => ({
        id: launchpad.id,
        name: launchpad.name || 'Unknown'
      }))
    );
  }

  getAllLaunches(): Observable<TransformedLaunch[]> {
    return this.http.get<Launch[]>(this.launchesUrl).pipe(
      switchMap(launches => {
        if (launches.length === 0) {
          return of([] as TransformedLaunch[]);
        }
        const requests = launches.map(launch =>
          forkJoin({
            rocket: this.getRocket(launch.rocket),
            launchpad: this.getLaunchpad(launch.launchpad)
          }).pipe(
            map(({ rocket, launchpad }) => ({
              ...launch,
              rocket: { name: rocket.name, type: rocket.type },
              launchpad: { name: launchpad.name }
            }))
          )
        );
        return forkJoin(requests);
      })
    );
  }

  getLaunchById(id: string): Observable<TransformedLaunch> {
    return this.http.get<Launch>(`${this.launchesUrl}/${id}`).pipe(
      switchMap(launch =>
        forkJoin({
          rocket: this.getRocket(launch.rocket),
          launchpad: this.getLaunchpad(launch.launchpad)
        }).pipe(
          map(({ rocket, launchpad }) => ({
            ...launch,
            rocket: { name: rocket.name, type: rocket.type },
            launchpad: { name: launchpad.name }
          }))
        )
      )
    );
  }

  getFilteredLaunches(year?: string, launchSuccess?: boolean, landingSuccess?: boolean): Observable<TransformedLaunch[]> {
    let query: any = {
      query: {},
      options: {
        limit: 100
      }
    };

    if (year) {
      query.query.date_utc = {
        $gte: `${year}-01-01T00:00:00.000Z`,
        $lte: `${year}-12-31T23:59:59.999Z`
      };
    }

    if (launchSuccess !== undefined) {
      query.query.success = launchSuccess;
    }

    if (landingSuccess !== undefined) {
      query.query['cores.landing_success'] = landingSuccess;
    }

    if (Object.keys(query.query).length === 0) {
      return this.getAllLaunches();
    }

    return this.http.post<{ docs: Launch[] }>(this.queryUrl, query).pipe(
      switchMap(response => {
        const launches = response.docs;
        if (launches.length === 0) {
          return of([] as TransformedLaunch[]);
        }
        const requests = launches.map(launch =>
          forkJoin({
            rocket: this.getRocket(launch.rocket),
            launchpad: this.getLaunchpad(launch.launchpad)
          }).pipe(
            map(({ rocket, launchpad }) => ({
              ...launch,
              rocket: { name: rocket.name, type: rocket.type },
              launchpad: { name: launchpad.name }
            }))
          )
        );
        return forkJoin(requests);
      })
    );
  }
}