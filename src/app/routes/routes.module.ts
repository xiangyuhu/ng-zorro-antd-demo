import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteRoutingModule } from './routes-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {KnowledgeClassificationComponent} from './knowledge/knowledge.classification.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SharedModule} from '../share/share.module';
import {KnowledgeClassificationAddComponent} from './knowledge/knowledge.classification.add.component';
import {ArticleAddComponent} from './knowledge/article/article.add.component';
import {ArticleListComponent} from './knowledge/article/article.list.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {ArticlePreViewComponent} from './knowledge/article/article.preview.component';
import {ArticleEditComponent} from './knowledge/article/article.edit.component';

@NgModule({
    imports: [SharedModule, RouteRoutingModule, NgZorroAntdModule, CKEditorModule],
    declarations: [
      DashboardComponent,
      KnowledgeClassificationComponent,
      KnowledgeClassificationAddComponent,
      ArticleAddComponent,
      ArticleListComponent,
      ArticlePreViewComponent,
      ArticleEditComponent
    ]
})

export class RoutesModule {}
