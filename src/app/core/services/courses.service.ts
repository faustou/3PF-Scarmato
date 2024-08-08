import { Injectable } from "@angular/core";
import { Courses } from "../../features/dashboard/courses/models";
import { map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

 @Injectable({
    providedIn: 'root',
 })
 export class CoursesService {
    private DATABASE: Courses[] = [
        { id: '40u4r',
            name: 'Javascript',
            endDate: new Date(),
            startDate: new Date(),
            classes: [
                {
                    classNumber: '1',
                    title: 'Introduction to Javascript',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '2',
                    title: 'Javascript Basics: Variables and Data Types',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '3',
                    title: 'Control Structures in Javascript',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '4',
                    title: 'Functions and Scope in Javascript',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '5',
                    title: 'Objects and Arrays in Javascript',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
            ],
        },
        { id: 'Gr8ME', name: 'React', endDate: new Date(), startDate: new Date(),
            classes: [
                {
                    classNumber: '1',
                    title: 'Introduction to React',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '2',
                    title: 'React Components and Props',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '3',
                    title: 'State and Lifecycle in React',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '4',
                    title: 'Handling Events in React',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '5',
                    title: 'Conditional Rendering in React',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
            ],
         },
        { id: 'uCwnz', name: 'Desarrollo Web', endDate: new Date(), startDate: new Date(),
            classes: [
                {
                    classNumber: '1',
                    title: 'Introduction to Web Development',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '2',
                    title: 'HTML & CSS Basics',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '3',
                    title: 'JavaScript Fundamentals',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '4',
                    title: 'Responsive Web Design',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '5',
                    title: 'Introduction to Web APIs',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
            ],
         },
        { id: 'bUHui', name: 'Angular', endDate: new Date(), startDate: new Date(),
            classes: [
                {
                    classNumber: '1',
                    title: 'Introduction to Angular',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '2',
                    title: 'Angular Components and Templates',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '3',
                    title: 'Data Binding and Directives in Angular',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '4',
                    title: 'Angular Services and Dependency Injection',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
                {
                    classNumber: '5',
                    title: 'Routing and Navigation in Angular',
                    date: new Date(),
                    live: 'https://zoom.us/es/signin#/login'
                },
            ],
         },
    ];

    constructor(private httpClient: HttpClient) {}

    getCourses(): Observable<Courses[]> {
        // return of (this.DATABASE);
        return this.httpClient.get<Courses[]>(environment.apiUrl + '/courses')
    }

    createCourse(course: Courses): Observable<Courses> {
        return this.httpClient.post<Courses>(environment.apiUrl + '/courses', course);
      }

    getCoursesByID(id:string): Observable<Courses | undefined> {
        return this.getCourses().pipe(map((allCourses)=> allCourses.find((el) => el.id === id)))
    }
    
    editCoursesByID(id: string, update: Partial<Courses>): Observable<Courses> {
        return this.httpClient.put<Courses>(`${environment.apiUrl}/courses/${id}`, update);
    }
    
    deleteCourseByID(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${environment.apiUrl}/courses/${id}`);
    }
 }