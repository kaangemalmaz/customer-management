import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { GenericHttpService } from '../../common/services/generic-http.service';
import { Router } from '@angular/router';
import { ApiSuccess } from '../../common/models/api-success.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private readonly httpService: GenericHttpService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.httpService.post<ApiSuccess<any>>(environment.loginUrl, this.loginForm.value, (res) => {
      const token = res?.data?.token;
      localStorage.setItem("token", token);
      this.router.navigateByUrl("/");
    });
  }
}
