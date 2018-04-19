import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ColumnComponent } from './column/column.component';
import { SettingComponent } from './setting/setting.component';
import { TypeComponent } from './type/type.component';
import { CategoryComponent } from './category/category.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SettingService } from './setting/setting.service';
import { TypeService } from './type/type.service';
import { ColumnService } from './column/column.service';
import { CategoryService } from './category/category.service';
import { RangeService } from './home/range.service';
import { TableComponent } from './table/table.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        ColumnComponent,
        SettingComponent,
        TypeComponent,
        CategoryComponent,
        BreadcrumbComponent,
        TableComponent
    ],
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        RangeService,
        SettingService,
        TypeService,
        ColumnService,
        CategoryService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
