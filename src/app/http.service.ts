import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseJson } from 'src/ResponseJson';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private REST_API_SERVER = "https://place-suggester.herokuapp.com/suggestion?"

  constructor(private httpClient: HttpClient) {
   }

   public sendGetRequest(location, type, lat, lng) : Observable<ResponseJson>{
     console.log(lat,lng)
     if(lat!=null && lng!=null){
       console.log(this.REST_API_SERVER+"latLng="+lat+","+lng+"&type="+type)
      return this.httpClient.get<ResponseJson>(this.REST_API_SERVER+"latLng="+lat+","+lng+"&type="+type)
     }
     else{
       return  this.httpClient.get<ResponseJson>(this.REST_API_SERVER+"location="+location+"&type="+type)
   .pipe(
     map(data => {return data}))
     }
  }
}
