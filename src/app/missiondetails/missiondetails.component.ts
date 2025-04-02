import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SpacexapiService, TransformedLaunch } from '../network/spacexapi.service';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.scss']
})
export class MissiondetailsComponent implements OnInit {
  launch: TransformedLaunch | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spacexService: SpacexapiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.spacexService.getLaunchById(id).subscribe({
        next: (data: TransformedLaunch) => {
          this.launch = data;
        },
        error: (error: any) => console.error('Error fetching launch details:', error)
      });
    }
  }

  getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}