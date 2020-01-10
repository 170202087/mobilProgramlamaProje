import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageModule } from "./login/login.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    LoginPageModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
