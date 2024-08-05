import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

const Routes: Routes = [
    {
      // Aqui estamos en /dashboard/home
      path: '',
      component: HomeComponent,
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule],

})

export class HomeRoutingModule {}