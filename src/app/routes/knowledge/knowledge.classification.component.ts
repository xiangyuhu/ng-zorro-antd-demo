import { Component } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {KnowledgeClassification} from '../../model/KnowledgeClassification';
import {Router} from '@angular/router';
import {HttpResponse} from '../../model/HttpResponse';
import {PageData} from '../../model/PageData';

@Component({
  selector: 'app-knowledge-classification',
  templateUrl: './knowledge.classification.component.html'
})
export class KnowledgeClassificationComponent {
  pageData: KnowledgeClassification[] = [];
  currentPage = 1;
  total = 1;
  constructor(private httpClient: HttpClient,
              private mesage: NzMessageService,
              private router: Router) {
    this.selectPage();
  }

  selectPage() {
    this.httpClient.get<HttpResponse<PageData<KnowledgeClassification>>>('/knowledge/knowledgeClassification/page/10/' + this.currentPage)
      .subscribe(data => {
      this.pageData =  data.data.results;
      this.total = data.data.total;
    });
  }
  refreshPageNum(pageNum: number) {
    this.currentPage = pageNum;
    this.selectPage();
  }

  delete(knowledgeClassification: KnowledgeClassification) {
    this.mesage.success('1111');
  }

  cancel() {
  }

  add() {
    this.router.navigateByUrl('/knowledge/addClassification');
  }
}
