import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

/**
 * Cria as rotas do sistema
 * @type {{path: string, component: HomeComponent}[]}
 */
export const ROUTES: Routes = [
    {
        path: '', component: HomeComponent
    }
];
