import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  providers: [UserService],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class UserModule { }
