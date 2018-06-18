import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from './user.service';
import { User } from './user-modal';

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit { 

  title:string = 'User App';
  isLoading:boolean = false;
   users: User[];
   statusCode: number;
   requestProcessing = false;
   userIdToUpdate = null;
   processValidation = false;
   newUser = new User();
   userForm = new FormGroup({
       name: new FormControl('', Validators.required),
       date_of_birth: new FormControl('', Validators.required),
       email: new FormControl('', Validators.required),
       github_address: new FormControl('', Validators.required),
       twitter_address: new FormControl('', Validators.required),
       city_of_residence: new FormControl('', Validators.required),
       pincode: new FormControl('', Validators.required),
   });

   constructor(private userService: UserService) {
   }

   ngOnInit(): void {
	   this.getAllUsers();
   }  

   /**
    * Get All Users
    */
   getAllUsers() {
     this.isLoading = true;

     setTimeout(()=>{   
      this.userService.getAllUsers().subscribe(data => {
        this.users = data;
        this.isLoading = false;
      },error => {
        this.isLoading = false;
        console.log("error occured in getAllUsers ", error);
      });
      this. isLoading = false; }, 2500);
   }



    /**
    * Create and update User
    */
   onUserFormSubmit() {
	  this.processValidation = true;   
	  if (this.userForm.invalid) {
	       return; 
	  }   
      this.preProcessConfigurations();
	  let article = this.userForm.value;
	  if (this.userIdToUpdate === null) {  
	    //Generate user id then create User
            this.userService.getAllUsers()
	      .subscribe(articles => {
			 
		   let maxIndex = articles.length - 1;
		   let articleWithMaxIndex = articles[maxIndex];
		   let articleId = articleWithMaxIndex.id + 1;
		   article.id = articleId;
		   
		   //Create User
     	           this.userService.createUser(article)
			  .subscribe(successCode => {
				   this.statusCode = successCode;
				   this.getAllUsers();	
				   this.backToCreateArticle();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	   } else {  
   	     //Handle update User
             article.id = this.userIdToUpdate; 		
	     this.userService.updateUser(article)
	        .subscribe(successCode => {
		     this.statusCode = successCode;
		     this.getAllUsers();	
		     this.backToCreateArticle();
		},
		errorCode => this.statusCode = errorCode);	  
	   }
   }


/**
 * Load User by Id 
 *  
 */
   loadUserToEdit(userId: string) {
      this.preProcessConfigurations();
      this.userService.getUserById(userId)
	   .subscribe(article => {
	            this.userIdToUpdate = article.id;   
	            this.userForm.setValue({

                    name: article.name,
                    date_of_birth: article.date_of_birth,
                    email: article.email,
                    github_address: article.github_address,
                    twitter_address: article.twitter_address,
                    city_of_residence: article.city_of_residence,
                    pincode: article.pincode,

                    });
	   	    this.processValidation = true;
		    this.requestProcessing = false;   
	   },
           errorCode =>  this.statusCode = errorCode);   
   }

   /**
    * Delete User
    */
   deleteUser(userId: string) {
      this.preProcessConfigurations();
      this.userService.deleteUser(userId)
	      .subscribe(successCode => {
		  this.statusCode = 204;
		  this.getAllUsers();	
		  this.backToCreateArticle();
		},
		errorCode => this.statusCode = errorCode);    
   }

  
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   backToCreateArticle() {
      this.userIdToUpdate = null;
      this.userForm.reset();	  
	  this.processValidation = false;
   }
}
    
