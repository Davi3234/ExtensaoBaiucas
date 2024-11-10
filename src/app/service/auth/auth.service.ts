import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken(): string{
    return 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibG9naW4iOiJkYXZpQGdtYWlsIiwibmFtZSI6IkRhdmkiLCJleHAiOjE3MzEzMzIzOTYsImlhdCI6MTczMTI0NTk5Nn0.Y2CX7C788t8dYU3xLfMuXLbsaxThJFfHq629QBQApg4';
  }
}
