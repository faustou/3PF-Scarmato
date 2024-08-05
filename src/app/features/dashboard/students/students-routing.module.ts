import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentsComponent } from "./students.component";

const Routes: Routes = [
    {
        path: '',
        component: StudentsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule],

})

export class StudentsRoutingModule {}