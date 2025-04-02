import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SpacexapiService } from '../network/spacexapi.service';
import { Launch } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.scss']
})
export class MissionlistComponent implements OnInit {
  launches: Launch[] = [];

  constructor(private spacexService: SpacexapiService) { }

  ngOnInit(): void {
    this.spacexService.getAllLaunches().subscribe(
      (data) => {
        this.launches = data.map(launch => ({
          ...launch,
          rocket: { name: launch.rocket.name || 'Unknown', type: launch.rocket.type || 'Unknown' }
        }));
      },
      (error) => console.error('Error fetching launches:', error)
    );
  }

  getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }
}