import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SpacexapiService } from '../network/spacexapi.service';
import { Launch } from '../models/mission';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.scss']
})
export class MissiondetailsComponent implements OnInit {
  launch: Launch | undefined;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexapiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.spacexService.getLaunchById(id).subscribe(
        (data) => {
          this.launch = {
            ...data,
            rocket: { name: data.rocket.name || 'Unknown', type: data.rocket.type || 'Unknown' }
          };
        },
        (error) => console.error('Error fetching launch details:', error)
      );
    }
  }

  getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }
}