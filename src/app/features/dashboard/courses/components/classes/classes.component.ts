import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../../../core/services/courses.service';
import { Observable, of } from 'rxjs';
import { Courses } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  displayedColumns: string[] = ['classNumber', 'title', 'date', 'live'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  courses$: Observable<Courses | undefined> = of();

  constructor(private coursesService: CoursesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const courseId = this.activatedRoute.snapshot.params['id'];
    this.courses$ = this.coursesService.getCoursesByID(courseId);

    this.courses$.subscribe(course => {
      if (course) {
        this.dataSource.data = course.classes;
      }
    });
  }
}
