import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

export interface Category {
  name: string;
  subcategories?: string[];
}

export const CATEGORY_DATA: Category[] = [
  {
    name: 'Dishwasher Machine',
    subcategories: ['Commercial Dishwashers', 'Industrial Washers']
  },
  {
    name: 'Food & Beverage',
    subcategories: ['Beverage Equipment', 'Food Prep', 'Storage']
  },
  {
    name: 'IT',
    subcategories: ['Networking', 'Endpoints']
  },
  {
    name: 'Nalcowater',
    subcategories: ['Water Treatment', 'Pumps & Valves']
  },
  {
    name: 'Healthcare',
    subcategories: [] // No subcategories
  }
];

@Component({
  selector: 'app-category-explorer',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule],
  templateUrl: './category-explorer.component.html',
  styleUrls: ['./category-explorer.component.scss']
})
export class CategoryExplorerComponent {
  categories = CATEGORY_DATA;
}
