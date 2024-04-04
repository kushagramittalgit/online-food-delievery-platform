import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm:string = '';

  constructor(activatedRoute:ActivatedRoute,private router:Router)
  {
    console.log(this.searchTerm)
    activatedRoute.params.subscribe(params => {
      if(params['searchTerm'] != undefined)
      this.searchTerm = params['searchTerm'];
    });
  }

  search(term:string)
  {
    if(term)
    {
      this.router.navigateByUrl('/search/' + term);
    }
  }
}
