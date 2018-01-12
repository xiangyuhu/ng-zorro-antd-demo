
import {Component, enableProdMode, OnInit, ViewChild} from '@angular/core';
import {NzInputDirectiveComponent, NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {KnowledgeClassification} from '../../../model/KnowledgeClassification';
import {HttpResponse} from '../../../model/HttpResponse';
import {Router} from '@angular/router';
enableProdMode();
@Component({
  selector: 'app-article-add',
  templateUrl: './article.add.component.html'
})

export class ArticleAddComponent implements OnInit {
  validateForm: FormGroup;

  config = {
    filebrowserBrowseUrl: '&&&&&',
    filebrowserUploadUrl: '&&&',
  };

  classifications: KnowledgeClassification[];

  public inputVisible = false;
  @ViewChild('input') input: NzInputDirectiveComponent;
  public tags = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private httpClient: HttpClient) {
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


  articleAdd() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
    if (this.validateForm.valid) {
      let sign = '';

      for (let i = 0; i < this.tags.length; i++ ) {
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
        'state': '1'
      };

      this.httpClient.post<HttpResponse<string>>('/knowledge/article/insert', reqBody).subscribe(data => {
        if (data.success) {
          this.message.success(data.message);
          this.router.navigateByUrl('/article/list');
        }
      });
    }


  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  getFormControlVlaue(name) {
    return this.validateForm.controls[ name ].value;
  }

  private initForm() {

    this.httpClient.get<HttpResponse<KnowledgeClassification[]>>('/knowledge/knowledgeClassification/select').subscribe(data => {
      if (data.success) {
        this.classifications = data.data;
      }
    });

    this.validateForm = this.fb.group({
      title: [ null, [ Validators.required ] ],
      classificationNo: [ null, [ Validators.required ] ],
      sign: [ null, [] ],
      author: [ null, [ Validators.required ] ],
      original: [ null, [ Validators.required ] ],
      icon: [ null, [] ],
      content: [ null, [Validators.required ] ],
    });
  }
}
