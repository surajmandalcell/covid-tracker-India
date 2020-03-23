import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FirebaseService } from './services/firebase.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // AngularFirestoreModule,
    // AngularFireAnalyticsModule,
    // AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  // providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
