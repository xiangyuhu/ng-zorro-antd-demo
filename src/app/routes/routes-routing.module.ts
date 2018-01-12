import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {environment} from '@env/environment';
import {LayoutDefaultComponent} from '../layout/default.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {KnowledgeClassificationComponent} from './knowledge/knowledge.classification.component';
import {KnowledgeClassificationAddComponent} from './knowledge/knowledge.classification.add.component';
import {ArticleAddComponent} from './knowledge/article/article.add.component';
import {ArticleListComponent} from './knowledge/article/article.list.component';
import {ArticlePreViewComponent} from './knowledge/article/article.preview.component';
import {ArticleEditComponent} from './knowledge/article/article.edit.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'knowledge/classification', component: KnowledgeClassificationComponent},
      { path: 'knowledge/addClassification', component: KnowledgeClassificationAddComponent},
      { path: 'article/list', component: ArticleListComponent},
      { path: 'article/add', component: ArticleAddComponent},
      { path: 'article/preview/:id', component: ArticlePreViewComponent},
      { path: 'article/edit/:id', component: ArticleEditComponent},

    ]
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule]
  })
export class RouteRoutingModule { }
