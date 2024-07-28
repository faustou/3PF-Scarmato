import { Injectable } from "@angular/core";
import { Students } from "../../features/dashboard/students/models";
import { Observable, of } from "rxjs";

 @Injectable({
    providedIn: 'root',
 })
 export class StudentsService {
    private DATABASE: Students[] = [
        { id: 'gKGTW', name: 'Fausto', lastName:'Scarmato', endDate: new Date(), startDate: new Date() },
        { id: '7k7VU', name: 'Harvey', lastName:'Specter', endDate: new Date(), startDate: new Date() },
        { id: 'WiJes', name: 'Jessica', lastName:'Pearson', endDate: new Date(), startDate: new Date() },
        { id: 'SmMVV', name: 'Mike', lastName:'Ross', endDate: new Date(), startDate: new Date() },
        { id: 'geJes', name: 'Rachel', lastName:'Zane', endDate: new Date(), startDate: new Date() },
        { id: 'faset', name: 'Donna', lastName:'Paulsen', endDate: new Date(), startDate: new Date() },
        { id: 'jykdf', name: 'Louis', lastName:'Litt', endDate: new Date(), startDate: new Date() }
    ];

    getStudents(): Observable<Students[]> {
        return of (this.DATABASE);
    }
 }