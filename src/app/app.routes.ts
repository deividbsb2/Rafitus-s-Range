import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingComponent } from './setting/setting.component';
import { ColumnComponent } from './column/column.component';
import { TypeComponent } from './type/type.component';
import { CategoryComponent } from './category/category.component';
import { TableComponent } from './table/table.component';

/**
 * Cria as rotas do sistema
 * @type {{path: string, component: HomeComponent}[]}
 */
export const ROUTES: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'setting', component: SettingComponent, data: { breadcrumb: 'Setting' }
    },
    {
        path: 'column', component: ColumnComponent, data: { breadcrumb: 'Column' }
    },
    {
        path: 'category', component: CategoryComponent, data: { breadcrumb: 'Category' }
    },
    {
        path: 'type', component: TypeComponent, data: { breadcrumb: 'Type' }
    },
    {
        path: 'table', component: TableComponent, data: { breadcrumb: 'Table' }
    }
];
