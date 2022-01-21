import { Component, OnInit } from '@angular/core';
import { tripDetails } from '../tripDetails';
import { HttpService } from '../http.service';
import { ResponseJson } from 'src/ResponseJson';
import { Result } from 'src/Result';
import { analyzeAndValidateNgModules, Position } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  location : string;
  selectedType :any;
  response : ResponseJson;
  results: Result[];
  itemCheck :any;
  showSearch : boolean;
  loading :boolean = false;;
  lat : number;
  lng : number;
  showAlert : boolean;
    
  constructor( private httpService : HttpService ) { 
    
  }

  ngOnInit(): void {
  }

  onSubmit(locationForm){
    this.location = locationForm.value.location;
    this.sendRequest();
  }

  keyword = 'name';
  public type = [
    {
      id: 1,
      name: 'Restaurant',
    },
    {
      id: 2,
      name: 'Hospital',
    },
    {
      id: 3,
      name: 'Atm',
    },
    {
      id: 4,
      name: 'Bakery',
    },
    {
      id: 5,
      name: 'Bank',
    },
    {
      id: 7,
      name: 'Movie_theater',
    },
    {
      id: 8,
      name: 'Bus_station',
    },
    {
      id: 9,
      name: 'Park',
    },
    {
      id: 10,
      name: 'Pharmacy',
    },
    {
      id: 11,
      name: 'Church',
    },
    {
      id: 12,
      name: 'Police',
    },
      {
        id: 13,
        name: 'Post_office',
      },
      {
        id: 14,
        name: 'Clothing_store',
      },
      {
        id: 15,
        name: 'Doctor',
      },
      {
        id: 16,
        name: 'School',
      },
      {
        id: 17,
        name: 'Shopping_mall',
      },
      {
        id: 18,
        name: 'Tourist_attraction',
      },
      {
        id: 19,
        name: 'Gas_station',
      },
      {
        id: 20,
        name: 'Hindu_temple',
      },
      {
        id: 21,
        name: 'Veterinary_care',
      }];

      selectEvent(item) {
        this.selectedType=item;
      }

      sendRequest(){
        this.showAlert = false;
        this.loading = true;
        this.httpService.sendGetRequest(this.location, this.selectedType.name.toLowerCase(), this.lat, this.lng).subscribe((data: any)=>{
        this.response = data;
          this.results = this.response.results;
          this.results.forEach(result => {
            result.url = "http://maps.google.com/?q="+result.name+","+this.location;
          });
          this.results.sort((a, b) => (a.user_ratings_total > b.user_ratings_total) ? -1 :  1 );
          this.showSearch = true;
          this.loading = false;
      }),
      (error) => {                              
        console.error('Request failed with error')
      }
      }

      getLocation() {
        this.showAlert = true;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            if (position) {
              console.log("Latitude: " + position.coords.latitude +
                "Longitude: " + position.coords.longitude);
              this.lat = position.coords.latitude;
              this.lng = position.coords.longitude;
              console.log(this.lat);
              console.log(this.lat);
            }
          },
            (error) => console.log(error));
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      }
     
    }

