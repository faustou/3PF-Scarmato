import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../students/components/student-dialog/student-dialog.component';
import { Courses } from './models';
import { generateId } from '../../../shared/utils';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { CoursesService } from '../../../core/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  nombreAlumno = '';
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions', 'classes'];
  dataSource: MatTableDataSource<Courses>;
  filteredDataSource: MatTableDataSource<Courses>;
  courses: Courses[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';

  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar, private coursesService: CoursesService) {
    this.dataSource = new MatTableDataSource(this.courses);
    this.filteredDataSource = new MatTableDataSource(this.courses);
  }
  ngOnInit(): void {
    this.coursesService.getCourses().subscribe({
      next: (coursesDataBase) => {
        this.courses = coursesDataBase;
        this.dataSource.data = this.courses;
        this.filteredDataSource.data = this.courses;
      },
      error: () => {},
      complete: () => {}
    });
  }

  openDialog(): void {
    this.matDialog.open(StudentDialogComponent).afterClosed().subscribe({
      next: (value) => {
        if (value) {
          value['id'] = generateId(5);
          this.nombreAlumno = value.name;
          this.dataSource.data = [...this.dataSource.data, value];
          this.applyFilter({ target: { value: '' } } as unknown as Event);
          this.snackBar.open('Se creo un alumno nuevo', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, });
        }
      }
    });
  }

  editCourses(editingCourses: Courses): void {
    this.matDialog.open(StudentDialogComponent, { data: editingCourses }).afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.dataSource.data = this.dataSource.data.map((el) => el.id === editingCourses.id ? { ...value, id: editingCourses.id } : el);
          this.applyFilter({ target: { value: '' } } as unknown as Event);
          this.snackBar.open('Se edito el alumno', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, });
        }
      }
    });
  }

  deleteCoursesById(id: string): void {
    this.dataSource.data = this.dataSource.data.filter((el) => el.id !== id);
    this.applyFilter({ target: { value: '' } } as unknown as Event);
    this.snackBar.open('Se elimino el alumno', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredDataSource.data = this.dataSource.data.filter((student) =>
      student.name.toLowerCase().includes(filterValue)
    );
  }
}
