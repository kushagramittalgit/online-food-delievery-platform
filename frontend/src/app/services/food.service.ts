import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_food, sample_tags } from 'src/data';
import { Tag } from '../shared/models/tags';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]>
  {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodBySearchTerm(searchterm:string)
  {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchterm)
  }

  getAlltags():Observable<Tag[]>
  {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodByTag(tag:string):Observable<Food[]>
  {
    return tag == "All" ?
    this.getAll():
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(FoodId:string):Observable<Food>
  {
    return this.http.get<Food>(FOODS_BY_ID_URL + FoodId);
  }
}
