import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SpacexapiService } from '../network/spacexapi.service';
import { Launch } from '../models/mission';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.scss']
})
export class MissionfilterComponent {
  launches: Launch[] = [];
  year: string = '';

  constructor(private spacexService: SpacexapiService) { }

  filterByYear(): void {
    if (this.year) {
      this.spacexService.getLaunchesByYear(this.year).subscribe(
        (data) => {
          this.launches = data.map(launch => ({
            ...launch,
            rocket: { name: launch.rocket.name || 'Unknown', type: launch.rocket.type || 'Unknown' }
          }));
        },
        (error) => console.error('Error filtering launches:', error)
      );
    }
  }

  getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }
}