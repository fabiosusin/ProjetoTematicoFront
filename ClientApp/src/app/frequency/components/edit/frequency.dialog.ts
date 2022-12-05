import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { Frequency } from '../../models/output/frequency';
import { FrequencyService } from '../../services/frequency.service';

@Component({
  selector: 'app-frequency-dialog',
  templateUrl: './frequency.dialog.html',
  styleUrls: ['./frequency.dialog.scss']
})
export class FrequencyDialog implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private frequencyService: FrequencyService,
    private providerService: ProviderService,
    public dialogRef: MatDialogRef<FrequencyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Frequency,
  ) {
    if (!this.data)
      this.data = new Frequency();
  }
  form?: FormGroup;
  isLoading?: boolean;

  async ngOnInit() {
    this._assignForm();
  }

  onSubmit = async (item: Frequency) => {
    if (!this._validateData())
      return;

    try {
      this.isLoading = true;

      const result = await this.frequencyService.upsert(item);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar salvar a Frequência!')
        return;
      }

      this.providerService.toast.successMessage(result.message ?? 'Frequência salva com sucesso!')
      this.closeDialog();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar salvar a Frequência!')
    }
    finally {
      this.isLoading = false;
    }
  }

  private _assignForm = async () => {

    this.form = this.formBuilder.group({
      activity: [this.data.activity],
      entryTime: [this.data.entryTime],
      exitTime: [this.data.exitTime],
      activityTotalTime: [this.data.activityTotalTime],
      fulfilledHours: [this.data.fulfilledHours],
      remainingHours: [this.data.remainingHours],
      appear: [true]
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
