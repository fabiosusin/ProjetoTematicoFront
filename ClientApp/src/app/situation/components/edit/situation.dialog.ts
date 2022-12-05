import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { Situation } from 'src/app/situation/models/output/situation';
import { SituationService } from '../../services/situation.service';

@Component({
  selector: 'app-situation-dialog',
  templateUrl: './situation.dialog.html',
  styleUrls: ['./situation.dialog.scss']
})
export class SituationDialog implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private situationService: SituationService,
    private providerService: ProviderService,
    public dialogRef: MatDialogRef<SituationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Situation,
  ) {
    if (!this.data)
      this.data = new Situation();
  }

  form?: FormGroup;
  isLoading?: boolean;

  async ngOnInit() {
    this._assignForm();
  }

  onSubmit = async (item: Situation) => {
    if (!this._validateData())
      return;

    try {
      this.isLoading = true;

      const result = await this.situationService.upsert(item);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar salvar a Situação!')
        return;
      }

      this.providerService.toast.successMessage(result.message ?? 'Situação salva com sucesso!')
      this.closeDialog();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar salvar a Situação!')
    }
    finally {
      this.isLoading = false;
    }
  }

  private _assignForm = async () => {

    this.form = this.formBuilder.group({
      processNumber: [this.data.processNumber ?? 0],
      varaOrigem: [this.data.varaOrigem],
      convictionQuantity: [this.data.convictionQuantity ?? 0],
      convictionType: [this.data.convictionType ?? 0],
      prdType: [0],
      finePrice: [this.data.finePrice ?? 0],
      prdToDo: [0],
      crimeType: [this.data.crimeType ?? 0],
      nonCriminalProsecutionAgreement: [false],
      originalPenalty: [0],
      totalDays: [this.data.totalDays ?? 0],
      fulfilledHours: [this.data.fulfilledHours ?? 0],
      remainingHours: [this.data.remainingHours ?? 0]
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
