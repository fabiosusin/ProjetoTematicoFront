import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { Interview } from '../../models/output/interview';
import { InterviewService } from '../../services/interview.service';

@Component({
  selector: 'app-interview-dialog',
  templateUrl: './interview.dialog.html',
  styleUrls: ['./interview.dialog.scss']
})
export class InterviewDialog implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private interviewService: InterviewService,
    private providerService: ProviderService,
    public dialogRef: MatDialogRef<InterviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Interview,
  ) {
    if (!this.data)
      this.data = new Interview();
  }
  form?: FormGroup;
  isLoading?: boolean;

  async ngOnInit() {
    this._assignForm();
  }

  onSubmit = async (item: Interview) => {
    if (!this._validateData())
      return;

    try {
      this.isLoading = true;

      const result = await this.interviewService.upsert(item);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar salvar a Entrevista!')
        return;
      }

      this.providerService.toast.successMessage(result.message ?? 'Entrevista salva com sucesso!')
      this.closeDialog();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar salvar a Entrevista!')
    }
    finally {
      this.isLoading = false;
    }
  }

  private _assignForm = async () => {

    this.form = this.formBuilder.group({
      familyIncome: [this.data.familyIncome],
      neighborhood: [this.data.neighborhood],
      city: [this.data.city],
      street: [this.data.street],
      complement: [this.data.complement],
      phone: [this.data.phone],
      streetNumber: [this.data.streetNumber],
      educationDegree: [this.data.educationDegree],
      workSkills: [this.data.workSkills],
      consumesAlcohol: [false],
      serviceHours: [this.data.serviceHours]
    });
  };

  private _validateData = (): boolean => {
    const invalidFields = [];
    if (!this.form?.valid)
      invalidFields.push('Informe os campos corretamente!')

    if (invalidFields.length) {
      this.providerService.toast.warningMessage('Nem todos os campos foram preenchidos corretamente:<br>' + invalidFields.join('<br>'));
      return false;
    }
    else
      return true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
