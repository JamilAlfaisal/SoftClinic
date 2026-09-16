import { Component, inject, input, OnInit } from '@angular/core';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Router, RouterLink } from '@angular/router';
import { InfoCard } from '../shared/info-card/info-card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { Countries } from '../helper-services/countries';
import { PatientsService, Patient, Gender } from '../patients/patients.service';

@Component({
  selector: 'app-add-patients',
  imports: [Sidebar, RouterLink, InfoCard, ɵInternalFormsSharedModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-patients.html',
  styleUrl: './add-patients.css',
})
export class AddPatients implements OnInit {
  countries = inject(Countries);
  patients = inject(PatientsService);
  router = inject(Router);
  fileNumber = input<string | undefined>();

  ngOnInit(): void {
    this.countries.getCountriesAndNationalities();
    const selectedPatient = this.patients.getPatientByFileNumber(this.fileNumber() ?? '');
    console.log("populate the form")
    if (selectedPatient) {
      this.populateForm(selectedPatient)
    }
  }

  form = new FormGroup({
    personalInformation: new FormGroup({
      fileNumber: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      fatherName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required]),
    }),

    contactInformation: new FormGroup({
      phone1: new FormControl('', [Validators.required]),
      phone2: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      addressDetails: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    }),

    accountAndFinancial: new FormGroup({
      balanceInUsd: new FormControl<number | undefined>(undefined, [Validators.required]),
      balanceInLbp: new FormControl<number | undefined>(undefined, [Validators.required]),
      paidThisMonthUsd: new FormControl<number | undefined>(undefined, [Validators.required]),
      paidThisMonthLbp: new FormControl<number | undefined>(undefined, [Validators.required]),
    }),
  });

  onSubmit() {
    this.form.markAllAsTouched();
    if (
      this.form.controls.contactInformation.valid &&
      this.form.controls.personalInformation.valid
    ) {
      const { accountAndFinancial, contactInformation, personalInformation } =
        this.form.getRawValue();
      const { firstName, lastName, gender, nationality, dob, fileNumber, fatherName, idNumber } =
        personalInformation;
      const { phone1, email, country, phone2, addressDetails, city } = contactInformation;
      const { balanceInUsd, balanceInLbp, paidThisMonthLbp, paidThisMonthUsd } =
        accountAndFinancial;
      const newPatient: Patient = {
        fileNumber: fileNumber!,
        firstName: firstName!,
        fatherName: fatherName!,
        lastName: lastName!,
        dob: dob!,
        gender: gender! as Gender,
        nationality: nationality!,
        idNumber: idNumber!,
        phone1: phone1!,
        phone2: phone2,
        email: email,
        addressDetails: addressDetails!,
        city: city!,
        country: country!,
        balanceUSD: balanceInUsd ?? 0,
        balanceLBP: balanceInLbp ?? 0,
        paidThisMonthUSD: paidThisMonthUsd ?? 0,
        paidThisMonthLBP: paidThisMonthLbp ?? 0,
      };
      
      if(this.fileNumber()){
        this.patients.updatePatient(this.fileNumber()!,newPatient)
      }else{
        this.patients.addPatient(newPatient);
      }
      this.router.navigateByUrl('/patients');
    }
  }

  onDelete() {
    // const confirm = window.
    if (this.fileNumber()) {
      this.patients.deletePatient(this.fileNumber()!);
      this.router.navigateByUrl('/patients');
    }
  }

  populateForm(patient: Patient): void {
    console.log("populate the form")
    this.form.patchValue({
      personalInformation: {
        fileNumber: patient.fileNumber,
        firstName: patient.firstName,
        fatherName: patient.fatherName,
        lastName: patient.lastName,
        dob: patient.dob,
        gender: patient.gender,
        nationality: patient.nationality,
        idNumber: patient.idNumber,
      },
      contactInformation: {
        phone1: patient.phone1,
        phone2: patient.phone2,
        email: patient.email,
        addressDetails: patient.addressDetails,
        city: patient.city,
        country: patient.country,
      },
      accountAndFinancial: {
        balanceInUsd: patient.balanceUSD,
        balanceInLbp: patient.balanceLBP,
        paidThisMonthUsd: patient.paidThisMonthUSD,
        paidThisMonthLbp: patient.paidThisMonthLBP,
      },
    });
  }
}
