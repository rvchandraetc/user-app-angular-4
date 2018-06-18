import { UserService } from './user/user.service';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [     
        BrowserModule,
		HttpModule,
            ReactiveFormsModule,
            FormsModule
  ],
  declarations: [
        AppComponent,
        UserComponent
  ],
  providers: [
      UserService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
