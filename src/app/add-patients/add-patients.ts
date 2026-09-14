import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../shared/sidebar/sidebar';
import { RouterLink } from '@angular/router';
import { InfoCard } from '../shared/info-card/info-card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Countries } from '../helper-services/countries';

@Component({
  selector: 'app-add-patients',
  imports: [Sidebar, RouterLink, InfoCard, ɵInternalFormsSharedModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-patients.html',
  styleUrl: './add-patients.css',
})
export class AddPatients implements OnInit{
  countries = inject(Countries)
  
  ngOnInit(): void {
    this.countries.getCountriesAndNationalities()
  }
  
  form = new FormGroup({
    personalInformation: new FormGroup({
      fileNumber: new FormControl('',[Validators.required]),
      firstName: new FormControl('',[Validators.required]),
      fatherName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      dob: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      nationality: new FormControl('',[Validators.required]),
      idNumber: new FormControl('',[Validators.required]),
    }),

    contactInformation: new FormGroup({
      phone1: new FormControl('',[Validators.required]),
      phone2: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      addressDetails: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),
    }),

    accountAndFinancial: new FormGroup({
      balanceInUsd: new FormControl('', [Validators.required,]),
      balanceInLbp: new FormControl('', [Validators.required]),
      paidThisMonthUsd: new FormControl('', [Validators.required]),
      paidThisMonthLbp: new FormControl('', [Validators.required]),
    })
  })


  onSubmit(){
    console.log(this.countries.allCountries())
    console.log("wow")
    console.log(this.form.value)
    
    if (this.form.valid){

    }
  }
}
