import { Component } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Article} from '../../../model/Article';
import {HttpResponse} from '../../../model/HttpResponse';
import {PageData} from '../../../model/PageData';

@Component({
  selector: 'app-article-list',
  templateUrl: './article.list.component.html'
})
export class ArticleListComponent {
  pageData: Article[] = [];
  currentPage = 1;
  total = 1;
  constructor(private httpClient: HttpClient,
              private mesage: NzMessageService,
              private router: Router) {
    this.selectPage();
  }

  refreshPageNum(pageNum: number) {
    this.currentPage = pageNum;
    this.selectPage();
  }

  delete(article: Article) {
    this.mesage.success('1111');
  }


  selectPage() {
    this.httpClient.get<HttpResponse<PageData<Article>>>('/knowledge/article/page/10/' + this.currentPage).subscribe(data => {
      this.pageData =  data.data.results;
      this.total = data.data.total;
    });
  }

  add() {
    this.router.navigateByUrl('/article/add');
  }

  edit(id: number) {
    this.router.navigate(['article/edit', id]);
  }
  preView(id: number) {
    this.router.navigate(['article/preview', id]);
  }

}
