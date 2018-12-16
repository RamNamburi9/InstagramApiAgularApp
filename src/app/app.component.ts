import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
export interface Profile {
  id: number,
  username: string,
  full_name: string,
  profile_picture: string,
  bio: string,
  website: string,
  is_business: boolean,
  counts: {
    media: number,
    follows: number,
    followed_by: number
  }
}

@Component({
  selector: 'app-root',
  templateUrl:'app.component.html', 
  styleUrls: [
    'app.component.css'
], 
  
})
export class AppComponent {
 
  ProfileResponse: Profile;
  MediaResponse:any;
 constructor(private http: HttpClient)
   {

    // check if the token exits and make the call to api
        this.CheckiftheAccesTokenExists()
   
   }
  
   CheckiftheAccesTokenExists()
   {

    try
    {
      let AcessToken = window.location.href.split('#')[1].split('=')[1];

      this.getInstaProfileInfo(AcessToken)
      .subscribe(
        (data) => { 
        this.ProfileResponse = data["data"];
          console.log(JSON.stringify(data));
         }, // success path
        error =>  error // error path
      );

        if(AcessToken.length > 10)
        {
         
          this.getInstaReCentMedia(AcessToken)
          .subscribe(
            (data) => { 
            this.MediaResponse = data["data"][0];
          
              console.log(JSON.stringify(data));
             }, // success path
            error =>  error // error path
          );
        }

    
    }
    catch(e)
    {
     
    }
   }
  
   getInstaProfileInfo(AcessToken) {
    return this.http.get("https://api.instagram.com/v1/users/self/?access_token="+AcessToken);
  }

  getInstaReCentMedia(AcessToken) {
  //  alert("https://api.instagram.com/v1/users/self/media/recent/?access_token="+AcessToken+"&count=1");
    return this.http.get<Profile>("https://api.instagram.com/v1/users/self/media/recent/?access_token="+AcessToken+"&count=1");
  }

  Redirect()
  {
    window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=2a3aafaa546f43f79c7275d9bf5fef7a&redirect_uri=http://www.ramnamburi.com.s3-website.us-east-2.amazonaws.com/&response_type=token";
  }
}
