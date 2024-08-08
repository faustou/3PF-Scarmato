import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../students/components/student-dialog/student-dialog.component';
import { Courses } from './models';
import { generateId } from '../../../shared/utils';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { CoursesService } from '../../../core/services/courses.service';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  nameCourse = '';
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
    this.matDialog.open(CoursesDialogComponent).afterClosed().subscribe({
      next: (value) => {
        if (value) {
          value['id'] = generateId(5);
          this.nameCourse = value.name;
          this.coursesService.createCourse(value).subscribe({
            next: (newCourse) => {
              this.dataSource.data = [...this.dataSource.data, newCourse];
              this.applyFilter({ target: { value: '' } } as unknown as Event);
              this.snackBar.open('Se creó un curso nuevo', 'Close', { 
                duration: 3000, 
                horizontalPosition: this.horizontalPosition 
              });
            },
            error: () => {
              this.snackBar.open('Error al crear el curso', 'Close', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition
              });
            }
          });
        }
      }
    });
  }

  editCourses(editingCourses: Courses): void {
    this.matDialog.open(CoursesDialogComponent, { data: editingCourses }).afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.coursesService.editCoursesByID(editingCourses.id, value).subscribe({
            next: (updatedCourse: Courses) => {
              this.dataSource.data = this.dataSource.data.map((el) => el.id === editingCourses.id ? updatedCourse : el);
              this.applyFilter({ target: { value: '' } } as unknown as Event);
              this.snackBar.open('Se editó el curso', 'Close', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
              });
            },
            error: () => {
              this.snackBar.open('Error al editar el curso', 'Close', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition
              });
            }
          });
        }
      }
    });
  }

  deleteCoursesById(id: string): void {
    this.coursesService.deleteCourseByID(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter((el) => el.id !== id);
        this.applyFilter({ target: { value: '' } } as unknown as Event);
        this.snackBar.open('Se eliminó el curso', 'Close', { 
          duration: 3000, 
          horizontalPosition: this.horizontalPosition 
        });
      },
      error: () => {
        this.snackBar.open('Error al eliminar el curso', 'Close', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredDataSource.data = this.dataSource.data.filter((student) =>
      student.name.toLowerCase().includes(filterValue)
    );
  }
}
