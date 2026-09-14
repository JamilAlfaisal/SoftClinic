import { computed, Injectable, signal } from '@angular/core';

export type Gender = 'Male' | 'Female' | 'Other';

export interface Patient {
  fileNumber: string;
  firstName: string;
  fatherName: string;
  lastName: string;
  dob: string;
  gender: Gender;
  nationality: string;
  idNumber: string;
  phone1: string;
  phone2?: string;
  email?: string;
  addressDetails: string;
  city: string;
  country: string;
  balanceUSD: number;
  balanceLBP: number;
  paidThisMonthUSD: number;
  paidThisMonthLBP: number;
}

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private patientsSignal = signal<Patient[]>([
    {
      fileNumber: 'FILE#123456',
      firstName: 'Slaymane',
      fatherName: 'Jihad',
      lastName: 'ABDUL HAMID',
      dob: '1995-06-15',
      gender: 'Male',
      nationality: 'Lebanese',
      idNumber: '102938475',
      phone1: '+961 71040522',
      phone2: '+961 71040523',
      email: 'slaymane@example.com',
      addressDetails: 'Main Street, Building 4, Floor 2',
      city: 'Tripoli',
      country: 'Lebanon',
      balanceUSD: 150.0,
      balanceLBP: 0,
      paidThisMonthUSD: 50.0,
      paidThisMonthLBP: 4500000,
    },
  ]);

  public readonly patients = this.patientsSignal.asReadonly();

  public readonly searchQuery = signal<string>('');

  public readonly filteredPatients = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.patientsSignal();

    return this.patientsSignal().filter(
      (patient) =>
        patient.fileNumber.toLowerCase().includes(query) ||
        patient.firstName.toLowerCase().includes(query) ||
        patient.lastName.toLowerCase().includes(query) ||
        patient.phone1.includes(query) ||
        patient.idNumber.includes(query),
    );
  });

  getPatientByFileNumber(fileNumber: string): Patient | undefined {
    return this.patientsSignal().find((p) => p.fileNumber === fileNumber);
  }

  addPatient(patient: Patient): void {
    this.patientsSignal.update((list) => [...list, patient]);
  }

  updatePatient(fileNumber: string, updatedData: Partial<Patient>): void {
    this.patientsSignal.update((list) =>
      list.map((patient) =>
        patient.fileNumber === fileNumber ? { ...patient, ...updatedData } : patient,
      ),
    );
  }

  deletePatient(fileNumber: string): void {
    this.patientsSignal.update((list) =>
      list.filter((patient) => patient.fileNumber !== fileNumber),
    );
  }

  recordPayment(fileNumber: string, amount: number, currency: 'USD' | 'LBP'): void {
    this.patientsSignal.update((list) =>
      list.map((patient) => {
        if (patient.fileNumber !== fileNumber) return patient;

        if (currency === 'USD') {
          return {
            ...patient,
            paidThisMonthUSD: patient.paidThisMonthUSD + amount,
            balanceUSD: Math.max(0, patient.balanceUSD - amount),
          };
        } else {
          return {
            ...patient,
            paidThisMonthLBP: patient.paidThisMonthLBP + amount,
            balanceLBP: Math.max(0, patient.balanceLBP - amount),
          };
        }
      }),
    );
  }

  generateFileNumber(): string {
    const nextId = Math.floor(100000 + Math.random() * 900000);
    return `FILE#${nextId}`;
  }
}
