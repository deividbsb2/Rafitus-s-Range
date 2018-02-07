import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {ROUTES} from './app.routes';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import {RangeService} from './range.service';
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [RangeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
