import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalAlertService {

  constructor() { }

  success(message: string, title: string = 'Başarılı'): void {
    this.showAlert(title, message, 'success');
  }

  error(message: string, title: string = 'Hata'): void {
    this.showAlert(title, message, 'error');
  }

  info(message: string, title: string = 'Bilgi'): void {
    this.showAlert(title, message, 'info');
  }

  warning(message: string, title: string = 'Uyarı'): void {
    this.showAlert(title, message, 'warning');
  }

  private showAlert(title: string, message: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title,
      text: message,
      icon,
      confirmButtonText: 'Tamam',
    });
  }

  confirm(text: string, title: string, btnName: string, callBack: () => void) {
    Swal.fire({
      text: text,
      title: title,
      showConfirmButton: true,
      confirmButtonText: btnName,
      showCancelButton: true,
      cancelButtonText: 'Vazgeç',
      allowOutsideClick: false,
      icon: 'question',
    }).then((res) => {
      if (res.isConfirmed) {
        callBack();
      }
    });
  }

  callDeleteSwal(title: string, btnName: string, callBack: () => void) {
    Swal.fire({
      text: 'Silme işlemine devam edilecektir. Onayliyor musunuz ?',
      title: title,
      showConfirmButton: true,
      confirmButtonText: btnName,
      showCancelButton: true,
      cancelButtonText: 'Vazgeç',
      allowOutsideClick: false,
      icon: 'question',
    }).then((res) => {
      if (res.isConfirmed) {
        callBack();
      }
    });
  }
}
