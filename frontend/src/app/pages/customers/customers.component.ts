import { GenericHttpService } from './../../common/services/generic-http.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SharedModule } from '../../common/shared/shared.module';
import { CustomerModel } from '../../common/models/customer.model';
import { environment } from '../../../environments/environment.development';
import { ApiSuccess } from '../../common/models/api-success.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalAlertService } from '../../common/services/swal-alert.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [SharedModule, NavbarComponent],
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  customerList: CustomerModel[] = [];
  selectedCustomer: CustomerModel = {
    id: 0,
    firstName: '',
    lastName: '',
    nationalId: '',
    registerDate: ''
  };

  customerAddForm!: FormGroup;
  customerEditForm!: FormGroup;

  constructor(private genericHttpService: GenericHttpService, private readonly fb: FormBuilder, private readonly swalAlertService: SwalAlertService, private date: DatePipe) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.customerAddFormInit();
    this.customerEditFormInit();
  }

  getAllCustomers() {
    this.genericHttpService.get<ApiSuccess<CustomerModel[]>>(environment.customerApiUrl, (res) => {
      this.customerList = res.data!;
    })
  }

  customerAddFormInit() {
    this.customerAddForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      nationalId: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      registerDate: ['', [Validators.required]]
    });
  }

  customerEditFormInit() {
    this.customerEditForm = this.fb.group({
      id: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      nationalId: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      registerDate: ['', [Validators.required]]
    });
  }


  save() {
    this.genericHttpService.post<ApiSuccess<CustomerModel>>(environment.customerApiUrl, this.customerAddForm.value, () => {
      this.swalAlertService.success("Müşteri Kaydı Başarılı!");
      document.getElementById("addFormCancelButton")?.click();
      this.customerAddForm.reset();
      this.getAllCustomers();
    });
  }

  get(model: CustomerModel) {
    this.selectedCustomer = { ...model };
    this.customerEditForm.patchValue({
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      nationalId: model.nationalId,
      registerDate: model.registerDate ? this.date.transform(model.registerDate, 'yyyy-MM-ddTHH:mm') : null
    });
  }


  edit() {
    this.genericHttpService.put<ApiSuccess<CustomerModel>>(environment.customerApiUrl, this.customerEditForm.value, () => {
      this.swalAlertService.success("Müşteri Başarıyla Güncellenmiştir!");
      document.getElementById("editFormCancelButton")?.click();
      this.customerEditForm.reset();
      this.getAllCustomers();
    });
  }

  removeById(model: CustomerModel) {
    this.swalAlertService.callDeleteSwal(`${model.firstName} ${model.lastName} müşterisi için`, "Sil", () => {
      this.genericHttpService.delete<ApiSuccess<CustomerModel>>(`${environment.customerApiUrl}/${model.id}`, () => {
        this.swalAlertService.success("Müşteri Başarıyla Silinmiştir!");
        this.getAllCustomers();
      });
    });
  }

  isInvalid(form: FormGroup, field: string): boolean {
    const control: AbstractControl | null = form.get(field);
    return !!(control && control.touched && control.invalid);
  }

  getErrorMessage(form: FormGroup, field: string): string | null {
    const control = form.get(field);
    if (!control || !control.errors) return null;

    if (control.errors['required']) return 'Bu alan zorunludur!';
    if (control.errors['minlength']) return `En az ${control.errors['minlength'].requiredLength} karakter olmalıdır!`;
    if (control.errors['maxlength']) return `En fazla ${control.errors['maxlength'].requiredLength} karakter olmalıdır!`;
    if (control.errors['pattern']) return 'Kimlik Numarası 11 karakter olmalıdır!';
    return 'Geçersiz giriş';
  }

}
