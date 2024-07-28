export interface CourseClass {
  classNumber: string;
  title: string;
  date: Date;
  live: string;
}

export interface Courses {
  id: string;
  name: string;
  endDate: Date;
  startDate: Date;
  classes: CourseClass[];
}
