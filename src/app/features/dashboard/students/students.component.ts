import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component'; 
import { Students } from './models';
import { generateId } from '../../../shared/utils';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  nombreAlumno = '';
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions'];
  dataSource: MatTableDataSource<Students>;
  filteredDataSource: MatTableDataSource<Students>;

  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar) {
    const students: Students[] = [
      { id: 'gKGTW', name: 'Fausto', lastName:'Scarmato', endDate: new Date(), startDate: new Date() },
      { id: '7k7VU', name: 'Harvey', lastName:'Specter', endDate: new Date(), startDate: new Date() },
      { id: 'WiJes', name: 'Jessica', lastName:'Pearson', endDate: new Date(), startDate: new Date() },
      { id: 'Wifes', name: 'Mike', lastName:'Ross', endDate: new Date(), startDate: new Date() },
      { id: 'geJes', name: 'Rachel', lastName:'Zane', endDate: new Date(), startDate: new Date() },
      { id: 'faset', name: 'Donna', lastName:'Paulsen', endDate: new Date(), startDate: new Date() },
      { id: 'jykdf', name: 'Louis', lastName:'Litt', endDate: new Date(), startDate: new Date() }
    ];
    this.dataSource = new MatTableDataSource(students);
    this.filteredDataSource = new MatTableDataSource(students);
  }

  openDialog(): void {
    this.matDialog.open(StudentDialogComponent).afterClosed().subscribe({
      next: (value) => {
        if (value) {
          value['id'] = generateId(5);
          this.nombreAlumno = value.name;
          this.dataSource.data = [...this.dataSource.data, value];
          this.applyFilter({ target: { value: '' } } as unknown as Event);
          this.snackBar.open('Se creo un alumno nuevo', 'Close', { duration: 3000 });
        }
      }
    });
  }

  editStudents(editingStudents: Students): void {
    this.matDialog.open(StudentDialogComponent, { data: editingStudents }).afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.dataSource.data = this.dataSource.data.map((el) => el.id === editingStudents.id ? { ...value, id: editingStudents.id } : el);
          this.applyFilter({ target: { value: '' } } as unknown as Event);
          this.snackBar.open('Se edito el alumno', 'Close', { duration: 3000 });
        }
      }
    });
  }

  deleteStudentsById(id: string): void {
    this.dataSource.data = this.dataSource.data.filter((el) => el.id !== id);
    this.applyFilter({ target: { value: '' } } as unknown as Event);
    this.snackBar.open('Se elimino el alumno', 'Close', { duration: 3000 });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredDataSource.data = this.dataSource.data.filter((student) =>
      student.name.toLowerCase().includes(filterValue) || student.lastName.toLowerCase().includes(filterValue)
    );
  }
}
