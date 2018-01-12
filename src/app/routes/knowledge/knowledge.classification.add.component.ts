
import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {HttpResponse} from '../../model/HttpResponse';
import {Router} from '@angular/router';

@Component({
  selector: 'app-knowledge-classification-add',
  templateUrl: './knowledge.classification.add.component.html'
})

export class KnowledgeClassificationAddComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private message: NzMessageService,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [ null, [ Validators.required ] ],
      no: [ null, [ Validators.required ] ],
      icon: [ null, [ Validators.required ] ]
    });
  }

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }

    if (this.validateForm.valid) {
      const reqBody = {
        'name' : this.validateForm.get('name').value,
        'no': this.validateForm.get('no').value,
        'icon': this.validateForm.get('icon').value
      };
      this.httpClient.post<HttpResponse<string>>('/knowledge/knowledgeClassification/insert', reqBody).subscribe(data => {
        if (data.success) {
          this.message.success(data.message);
          this.router.navigateByUrl('knowledge/classification');
        }
      });
    }
  }



  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }
}
