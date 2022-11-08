import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs';
import { UserService } from '../services/user.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import ToastService from 'src/app/utils/toast.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
    private actRoute: ActivatedRoute
  ) {

  }

  id = '';

  form = new UntypedFormGroup({
    name: new UntypedFormControl(
        null, 
        [
          Validators.required,
          Validators.maxLength(255)
        ]
    ),
    lastName: new UntypedFormControl(
        null, 
        [
          Validators.required,
          Validators.maxLength(255)
        ]
    ),
    email: new UntypedFormControl(
        null, 
        [
          Validators.required, 
          Validators.email
        ]
    ),
    birthDate: new UntypedFormControl(
      null, 
      [
        Validators.required, 
      ]
    ),
    schooling: new UntypedFormControl(
      null, 
      [
        Validators.required, 
      ]
    ),
  });

  scoolings = [
    {
      description: 'Infantil',
      value: '1'
    },
    {
      description: 'Fundamental',
      value: '2'
    },
    {
      description: 'Médio',
      value: '3'
    },
    {
      description: 'Superior',
      value: '4'
    }
  ];

  submitted = false;

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params?.['id'];
    if (this.id) {
      this.userService.getById(this.id).subscribe(x => {
        let date = x.birthDate;
        this.form.patchValue({
          ...x, 
          email: x.email?.address, 
          birthDate: `${date.split("-")[0]}-${date.split("-")[1]}-${(date.split("-")[2]).substring(2, 0)}`
        });
      })
    }
  }

  salvar() {
    this.submitted = true;
    if (this.form.invalid) return;

    const data =  {
      ...this.form.value,
      schooling: this.form.get('schooling')?.value.toString()
    };

    const obs =
      (
        this.id
        ? this.userService.put(this.id, data)
        : this.userService.post(data)
      ).pipe(
      ).subscribe(resp => {
        this.toastService.toastr.success("Registro salvo com sucesso", "Sucesso");
        this.router.navigate(['']);
      }, err => {
        this.toastService.toastr.error(err.error.errors, "Atenção");
      });
  }

}