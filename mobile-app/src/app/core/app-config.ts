import { checkUpType } from '../pages/dashboard/models/check-up';

export class AppConfig {
  public static userData = {
    'Doctor appointment': {
      Date: '19/01/2019',
      Type: checkUpType.DOCTOR,
      Place: 'Sylvia Kollmann',
      Tests: {
        Weight: '60kg',
        Height: '170',
        'Sore throat': 'positive'
      },
      Diagnostics:
      {
        NTR: 'Height and weight are normal',
        Angine: "Angine confirmed"
      }
    },
    'Mononucleosis check-up': {
      Date: '14/01/2019',
      Type: checkUpType.BLOOD,
      Place: 'Lab.Oratory ',
      Tests: {
        'IgG VCA': 280,
        'IgM VCA': 8
      },
      Diagnostics: { RAS: 'Negative mononucleosis' }
    }
  }
}