import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SpacexapiService, TransformedLaunch } from '../network/spacexapi.service';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.scss']
})
export class MissionlistComponent implements OnInit {
  launches: TransformedLaunch[] = [];

  constructor(private spacexService: SpacexapiService) { }

  ngOnInit(): void {
    this.spacexService.getAllLaunches().subscribe({
      next: (data: TransformedLaunch[]) => {
        this.launches = data;
      },
      error: (error: any) => console.error('Error fetching launches:', error)
    });
  }

  getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }
}