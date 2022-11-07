import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.getProjectData();
  }

  getProjectData() {
    const id = this.route.snapshot.paramMap.get('id');
  }
}
