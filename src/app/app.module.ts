import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import { HeroService }          from './hero.service';
import { MessageService }       from './message.service';
import { TargetComponent } from './target/target.component';
import { TargetService }  from './target/target.service';
import { TargetListComponent } from './target/target-list/target-list.component';
import { TargetItemComponent } from './target/target-list/target-item/target-item.component';
import { TargetEditComponent } from './target/target-edit/target-edit.component';
import { TargetDetailComponent } from './target/target-detail/target-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { TargetHomeComponent } from './target/target-home/target-home.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    TargetComponent,
    TargetListComponent,
    TargetItemComponent,
    TargetEditComponent,
    TargetDetailComponent,
    TargetHomeComponent
  ],
  providers: [ HeroService, MessageService, TargetService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
