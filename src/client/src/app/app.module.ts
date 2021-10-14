import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { IndexComponent } from './components/index/index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostState } from './state/user.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { SortPipe } from './redux/sort.pipe'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    IndexComponent,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    NgxsModule.forRoot([
      PostState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
