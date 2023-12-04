import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TodoComponent } from "../todo/todo.component";



@NgModule({
    declarations: [MainComponent],
    providers: [UserService],
    exports: [
        MainComponent
    ],
    imports: [
        CommonModule,
        TodoComponent
    ]
})
export class MainModule { }
