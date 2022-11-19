import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) { }

  form: FormGroup;
  isEditing = false;

  ngOnInit(): void {
    this.ref.onClose.subscribe({
      next: ((response: any) => {
        if (response) {
          Swal.fire({
            title: `Ahora el partido político se llama "${response.name}"`,
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
          })
        }
      })
    })

    const id = this.config.data.id;
    this.isEditing = this.config.data.isEditing;
    this.form = this.fb.group({
      name: [null, Validators.required]
    });

    this.shared.get(`parties/${id}`).subscribe({
      next: ((response: any) => {
        if (this.form) this.form.get('name').setValue(response?.party?.name || '');
      })
    });

    this.form.get('name')[this.isEditing ? 'enable': 'disable']();
  }

  onSubmit() {
    const id = this.config.data.id;
    this.shared.put(`parties/${id}`, this.form.value).subscribe({
      next: ((response: any) => {
        this.ref.close(response);
      })
    })
  }

  close() {
    this.ref.close();
  }
}
