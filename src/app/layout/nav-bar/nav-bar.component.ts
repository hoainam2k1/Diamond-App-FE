import { Component, HostListener, OnInit } from '@angular/core';

declare var WOW: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  constructor() { }

  ngOnInit(): void 
  {
    this.initializeWOW();
    this.initializePageLinks();
    this.initializeMenuScroll();
    this.handleStickyHeader();
  }

  private initializeWOW() 
  {
    new WOW().init();
  }
  private initializePageLinks() 
  {
    const pageLinks = document.querySelectorAll<HTMLAnchorElement>(".ud-menu-scroll");

    pageLinks.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = elem.getAttribute("href");
        const targetElement = document.querySelector(targetId ?? "");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  private initializeMenuScroll() 
  {
    window.addEventListener('scroll', () => this.onScroll());
  }

  private onScroll() 
  {
    const pageLinks = document.querySelectorAll<HTMLAnchorElement>(".ud-menu-scroll");
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    pageLinks.forEach((currLink) => 
    {
      const val = currLink.getAttribute("href");
      if(val)
      {
        const refElement = document.querySelector(val)  as HTMLElement;;
        const scrollTopMinus = scrollPos + 73;
        if (
          refElement &&
          refElement instanceof HTMLElement &&
          refElement.offsetTop <= scrollTopMinus &&
          (refElement.offsetTop + refElement.offsetHeight) > scrollTopMinus
        ) 
        {
          document.querySelector(".ud-menu-scroll")?.classList.remove("active");
          currLink.classList.add("active");
        } 
        else
        {
          currLink.classList.remove("active");
        }
      }
    });
  }
  private handleStickyHeader() {
    const header = document.querySelector('.ud-header') as HTMLElement;
    if (header) {
      const sticky = header.offsetTop;
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > sticky) {
          header.classList.add('sticky');
        } else {
          header.classList.remove('sticky');
        }
      });
    }
  }
}
