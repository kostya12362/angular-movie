import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ApiService} from "../api.service";
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";

declare var $: any;
interface TokenObj {
  token:string;

}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
       authForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
       registerMode = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {

    $('#goSign').click(function(){
        $(".form-container.log-in-container").slideUp(1000);
        $(".form-container.log-in-container").slideDown(1000);
     });

    const mrToken = this.cookieService.get('mr-token');
    console.log(mrToken);
    if (mrToken) {
      console.log(mrToken)
      this.router.navigate(['/movies']);
    }
  }

  saveForm(){
    if (this.registerMode) {
          this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        console.log(result);
        this.cookieService.set('mr-token', result.token);
        this.router.navigate(['/movies']);

      },
        error => console.log(error)
      );
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe(
        result => {
         console.log(result)
                  this.router.navigate(['/movies']);

        },
        error => console.log(error)
      );
     }
    }
  }


