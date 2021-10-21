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
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { SortPipe } from './redux/sort.pipe'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { SpiderManComponent } from './components/spider-man/spider-man.component';
import { CrimeComponent } from './components/crime/crime.component';
import { CodingComponent } from './components/coding/coding.component';


const appRoutes: Routes = [
  { path: 'home', component: IndexComponent},
  { path: 'create', component: CreateComponent},
  { path: 'f/Spider-man', component: SpiderManComponent},
  { path: 'f/Coding', component: CodingComponent},
  { path: 'f/Crime', component: CrimeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    IndexComponent,
    SortPipe,
    HomeComponent,
    SpiderManComponent,
    CrimeComponent,
    CodingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatExpansionModule,
    MatDividerModule,
    MatCardModule,
    FormsModule,
    NgxsModule.forRoot([
      PostState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
