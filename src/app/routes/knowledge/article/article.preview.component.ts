import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '../../../model/HttpResponse';
import {Router, ActivatedRoute} from '@angular/router';
import {Article} from '../../../model/Article';
@Component({
  selector: 'app-article-preview',
  templateUrl: './article.preview.component.html'
})
export class ArticlePreViewComponent {
  articleId: number;
  article: Article = new Article();
  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.articleId = this.activatedRoute.snapshot.params['id'];
    this.getArticle();
  }

  getArticle() {
    this.httpClient.get<HttpResponse<Article>>('/knowledge/article/detail/' + this.articleId)
      .subscribe(data => {
        this.article =  data.data;
      });
  }
}
