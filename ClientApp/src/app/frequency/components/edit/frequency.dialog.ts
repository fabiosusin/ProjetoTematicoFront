import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasePage } from 'src/app/core/components/base-page';
import { FilesService } from 'src/app/core/services/files/files.service';
import { GeneralService } from 'src/app/core/services/general/general.service';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { Frequency } from '../../models/output/frequency';
import { FrequencyService } from '../../services/frequency.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-frequency-dialog',
  templateUrl: './frequency.dialog.html',
  styleUrls: ['./frequency.dialog.scss']
})
export class FrequencyDialog extends BasePage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private frequencyService: FrequencyService,
    private providerService: ProviderService,
    protected location: Location,
    protected provider: ProviderService,
    protected generalService: GeneralService,
    protected filesService: FilesService,
    public dialogRef: MatDialogRef<FrequencyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Frequency,
  ) {
    super(location, provider, generalService, filesService);

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

    const entryDate = new Date(this.data.entryTime ?? new Date()).toISOString();
    const exitDate = new Date(this.data.exitTime ?? new Date()).toISOString();
    this.form = this.formBuilder.group({
      id: [this.data.id ?? 0],
      personDocument: [this.data.personDocument],
      activity: [this.data.activity],
      entryTime: [entryDate.replace(entryDate.substring(entryDate.indexOf('.')), '')],
      exitTime: [exitDate.replace(exitDate.substring(exitDate.indexOf('.')), '')],
      activityTotalTime: [this.data.activityTotalTime ?? 0],
      fulfilledHours: [this.data.fulfilledHours ?? 0],
      remainingHours: [this.data.remainingHours ?? 0],
      appear: [this.data.appear ?? false]
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
