import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})


export class AppComponent implements OnInit {
  constructor(
    private router: Router
  ) {
  }
  ngOnInit() {
    this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd),
      map(() => this.router.url)
    ).subscribe(url => {
    });
  }
}
