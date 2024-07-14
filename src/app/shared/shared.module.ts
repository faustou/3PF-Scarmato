import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameCompletePipe } from './pipes/name-complete.pipe';



@NgModule({
  declarations: [
    NameCompletePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [NameCompletePipe],
})
export class SharedModule { }
