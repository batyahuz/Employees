import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../components/input-field-component/input-field.component';
import { RouterModule } from '@angular/router';
import { routes } from './user.routes';



@NgModule({
    declarations: [
        LoginPageComponent
    ],
    providers: [
        UserService
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        InputFieldComponent
    ]
})
export class UserModule { }
