import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { ClassesComponent } from "./components/classes/classes.component";

const Routes: Routes = [
    {
      // Aqui estamos en /dashboard/home
      path: '',
      component: CoursesComponent,
    },
    {
        path: ':id',
        component: ClassesComponent
      }
  ];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule],

})

export class CoursesRoutingModule {}