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
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { SpacexapiService, TransformedLaunch } from '../network/spacexapi.service';

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
    MatIconModule,
    MatRadioModule,
    MatDividerModule
  ],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.scss']
})
export class MissionfilterComponent {
  launches: TransformedLaunch[] = [];
  year: string = '';
  launchSuccess: boolean | undefined = undefined;
  landingSuccess: boolean | undefined = undefined;

  constructor(private spacexService: SpacexapiService) { }

  applyFilters(): void {
    this.spacexService.getFilteredLaunches(this.year, this.launchSuccess, this.landingSuccess).subscribe({
      next: (data: TransformedLaunch[]) => {
        this.launches = data;
      },
      error: (error: any) => console.error('Error filtering launches:', error)
    });
  }

  resetFilters(): void {
    this.year = '';
    this.launchSuccess = undefined;
    this.landingSuccess = undefined;
    this.spacexService.getAllLaunches().subscribe({
      next: (data: TransformedLaunch[]) => {
        this.launches = data;
      },
      error: (error: any) => console.error('Error resetting filters:', error)
    });
  }

  getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }
}