import {Component} from '@angular/core';
import {Router, NavigationEnd, RouteConfigLoadStart, NavigationError} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-layout-default',
  templateUrl: './default.component.html',
  styleUrls: ['./style/layout.less']
})
export class LayoutDefaultComponent {
  menuList = [];
  title = '首页';
  subTitle = '工作台';

  constructor(private router: Router,
              private _message: NzMessageService,
              private httpClient: HttpClient) {
    this.menuInit();
  }

  menuInit() {
    this.httpClient.get('assets/app-data.json').subscribe(data => {
      this.menuList = <any[]> data;
    });
  }

  // 工作台
  toDesboard() {
    this.router.navigateByUrl('dashboard');
  }

  logout() {
  }

  menuClick(parentMenu, self) {
    this.title = parentMenu.text;
    this.subTitle = self.text;
  }
}
