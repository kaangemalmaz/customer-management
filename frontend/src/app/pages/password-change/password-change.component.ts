import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericHttpService } from '../../common/services/generic-http.service';
import { Router } from '@angular/router';
import { ApiSuccess } from '../../common/models/api-success.model';
import { environment } from '../../../environments/environment.development';
import { SharedModule } from '../../common/shared/shared.module';

@Component({
  selector: 'app-password-change',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.scss'
})
export class PasswordChangeComponent {
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private readonly httpService: GenericHttpService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.mustMatch('newPassword', 'confirmPassword') }
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }

  isInvalid(form: FormGroup, field: string): boolean {
    const control: AbstractControl | null = form.get(field);
    return !!(control && control.touched && control.invalid);
  }

  getErrorMessage(form: FormGroup, field: string): string | null {
    const control = form.get(field);
    if (!control || !control.errors) return null;

    if (control.errors['required']) return 'Bu alan zorunludur';
    if (control.errors['minlength']) return `En az ${control.errors['minlength'].requiredLength} karakter olmalıdır`;
    if (control.errors['mustMatch']) return `Şifreler uyuşmuyor.`;
    return 'Geçersiz giriş';
  }

  onSubmit() {
    this.httpService.post<ApiSuccess<any>>(environment.changePasswordUrl, this.passwordForm.value, (res) => {
      localStorage.clear();
      this.router.navigateByUrl("/login");
    });
  }
}
