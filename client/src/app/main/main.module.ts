import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';



@NgModule({
  declarations: [MainComponent],
  providers: [UserService],
  imports: [
    CommonModule,
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
