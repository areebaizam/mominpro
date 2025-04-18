import { Component, inject, input, Input, OnInit, } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd,RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
    selector: 'tap-breadcrumb',
    imports: [RouterLink],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit{
  @Input() breadcrumb!: Breadcrumb;
  isMobile = input.required<boolean>();
  router= inject( Router);
  activatedRoute= inject( ActivatedRoute);
  breadcrumbs: Breadcrumb[] = [];

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.buildBreadcrumbs(this.activatedRoute.root))
      )
      .subscribe((breadcrumbs) => (this.breadcrumbs = breadcrumbs));
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const { breadcrumb } = route.snapshot.data;
    const path = route.routeConfig?.path || '';
    const nextUrl = path ? `${url}/${path}` : url;

    if(!breadcrumb){
      breadcrumbs.push({ label: 'Home', url: '' });
    }
    else if (breadcrumb && !breadcrumbs.some(bc => bc.label === breadcrumb)) {
      breadcrumbs.push({ label: breadcrumb, url: nextUrl });
    }
  
    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
    }
    
    return breadcrumbs;
  }
}
