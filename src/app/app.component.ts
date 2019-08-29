import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Pharmacy';
  public headerFooter = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          for (let i = 0; i < this.router.config.length; i++) {
            if (
                  this.router.config[i].path === event.url.substring(1) ||
                  event.url.substring(1, 8) === 'browse/' ||
                  event.url.substring(1, 19) === 'non-prescriptions/' ||
                  event.url.substring(1, 8) === 'search?'|| 
                  event.url.substring(1, 13) === 'newcheckout/') {
                    this.headerFooter = true;
              break;
            } else {
              this.headerFooter = false;
            }
          }
        }
      });
  }
}
