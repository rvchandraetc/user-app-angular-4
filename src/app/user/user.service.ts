import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './user-modal';

@Injectable()
export class UserService {
    userUrl = " http://localhost:3000/users";  
    
	constructor(private http:Http) { 
    }
    

    /*
    ** Fetch All Users
    */
    getAllUsers(): Observable<User[]> {
    console.log('Inside getUsers');
     return this.http.get(this.userUrl)
	   .map(this.extractData)
	   .catch(this.handleError);
    }




    /*
    ** Create User
    */
    createUser(user: User):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log('in create', user);
        return this.http.post(this.userUrl, user, options)
               .map(success => success.status)
               .catch(this.handleError);
    }


     /*
      ** Get a User by Id
    */
    getUserById(userId: string): Observable<User> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: cpHeaders });
	console.log(this.userUrl +"/"+ userId);
	return this.http.get(this.userUrl +"/"+ userId)
	   .map(this.extractData)
	   .catch(this.handleError);
    }
    
    
    /**
     * Update a User
     */
    updateUser(user: User):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.userUrl +"/"+ user.id, user, options)
               .map(success => success.status)
               .catch(this.handleError);
    }

    /**
     * Delete a User
     */
    deleteUser(userId: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: cpHeaders });
	return this.http.delete(this.userUrl +"/"+ userId)
	       .map(success => success.status)
               .catch(this.handleError);
    }	


	
	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}
