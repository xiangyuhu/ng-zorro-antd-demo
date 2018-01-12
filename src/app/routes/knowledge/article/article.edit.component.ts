
import {Component, enableProdMode, OnInit, ViewChild} from '@angular/core';
import {NzInputDirectiveComponent, NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {KnowledgeClassification} from '../../../model/KnowledgeClassification';
import {HttpResponse} from '../../../model/HttpResponse';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../../../model/Article';
enableProdMode();
@Component({
  selector: 'app-article-edit',
  templateUrl: './article.edit.component.html'
})

export class ArticleEditComponent implements OnInit {
  article: Article;
  articleId: number;
  validateForm: FormGroup;

  config = {
    filebrowserBrowseUrl: '&&&&&',
    filebrowserUploadUrl: '&&&',
    codeSnippet_theme: 'monokai_sublime'
  };

  classifications: KnowledgeClassification[];

  public inputVisible = false;
  @ViewChild('input') input: NzInputDirectiveComponent;
  public tags = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private message: NzMessageService,
              private httpClient: HttpClient) {
    this.articleId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.initForm();
  }

  handleClose(removedTag: any): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.validateForm.get('sign').value) {
      this.tags.push(this.validateForm.get('sign').value);
    }
    // this.validateForm.get('sign').value = '';
    this.inputVisible = false;
  }


  articleUpdate() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.valid) {
      let sign = '';

      for (let i = 0; i < this.tags.length; i++) {
        if (i !== this.tags.length - 1) {
          sign += this.tags[i] + ',';
        } else {
          sign += this.tags[i];
        }
      }

      const reqBody = {
        'title': this.getFormControlVlaue('title'),
        'classificationNo': this.getFormControlVlaue('classificationNo'),
        'icon': this.getFormControlVlaue('icon'),
        'content': this.getFormControlVlaue('content'),
        'sign': sign,
        'author': this.getFormControlVlaue('author'),
        'original': this.getFormControlVlaue('original'),
        'state': '1',
        'id': this.articleId
      };

      this.httpClient.post<HttpResponse<string>>('/knowledge/article/update', reqBody).subscribe(data => {
        this.message.success(data.message);
        if (data.success) {
          this.router.navigateByUrl('/article/list');
        }
      });
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  getFormControlVlaue(name) {
    return this.validateForm.controls[name].value;
  }

  private initForm() {
    this.httpClient.get<HttpResponse<KnowledgeClassification[]>>('/knowledge/knowledgeClassification/select').subscribe(data => {
      if (data.success) {
        this.classifications = data.data;
      }
    });

    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      classificationNo: [null, [Validators.required]],
      sign: [null, []],
      author: [null, [Validators.required]],
      original: [null, [Validators.required]],
      icon: [null, []],
      content: [null, [Validators.required]],
    });

    this.httpClient.get<HttpResponse<Article>>('/knowledge/article/detail/' + this.articleId).subscribe(data => {
       this.article = data.data;
       this.validateForm.setValue({
         title: this.article.title,
         classificationNo: this.article.classificationNo,
         author: this.article.author,
         content: this.article.content,
         original: this.article.original,
         icon: this.article.icon,
         sign: null
       });
       this.tags = this.article.sign.split(',');
    });



  }
}
