import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { Students } from './models';
import { generateId } from '../../../shared/utils';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { StudentsService } from '../../../core/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  nombreAlumno = '';
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions'];
  dataSource: MatTableDataSource<Students>;
  filteredDataSource: MatTableDataSource<Students>;
  students: Students[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';

  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar, private studentsService: StudentsService) {
    this.dataSource = new MatTableDataSource(this.students);
    this.filteredDataSource = new MatTableDataSource(this.students);
  }

  ngOnInit(): void {
    this.studentsService.getStudents().subscribe({
      next: (studentsDataBase) => {
        this.students = studentsDataBase;
        this.dataSource.data = this.students;
        this.filteredDataSource.data = this.students;
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
          this.snackBar.open('Se creó un alumno nuevo', 'Close', { duration: 3000 });
        }
      }
    });
  }

  editStudents(editingStudent: Students): void {
    this.matDialog.open(StudentDialogComponent, { data: editingStudent }).afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.dataSource.data = this.dataSource.data.map((el) => el.id === editingStudent.id ? { ...value, id: editingStudent.id } : el);
          this.applyFilter({ target: { value: '' } } as unknown as Event);
          this.snackBar.open('Se editó el alumno', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, });
        }
      }
    });
  }

  deleteStudentsById(id: string): void {
    this.dataSource.data = this.dataSource.data.filter((el) => el.id !== id);
    this.applyFilter({ target: { value: '' } } as unknown as Event);
    this.snackBar.open('Se eliminó el alumno', 'Close', { duration: 3000, horizontalPosition: this.horizontalPosition, });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredDataSource.data = this.dataSource.data.filter((student) =>
      student.name.toLowerCase().includes(filterValue) || student.lastName.toLowerCase().includes(filterValue)
    );
  }
}
