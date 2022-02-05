import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuantitativeInstrumentService} from "./quantitative-instrument.service";
import {AnswerModel} from "./answer.model";

interface ListTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-quantitative-instrument',
  templateUrl: './quantitative-instrument.component.html',
  styleUrls: ['./quantitative-instrument.component.scss']
})
export class QuantitativeInstrumentComponent implements OnInit {
  comorbidityFormGroup!: FormGroup;
  secundaryInfo!: FormGroup;
  personalInfo!: FormGroup;
  factors!: FormGroup;
  selectedValue: string = "";
  sexValue: string = "";
  ethnicityValue: string = "";
  civilStatusValue: string = "";
  typeDwellingValue: string = "";
  scholarshipValue: string = "";
  occupationValue: string = "";
  workModeValue: string = "";
  socialSecurityValue: string = "";
  hadCovid: number = 1;
  deadFamilyCovid: number = 1;
  armedConflict: number = 1;
  diomesticViolence: number = 1;
  mentalHealth: number = 1;
  vaccinationPosture: any;
  quinto: any;
  citiesValue: any;
  answerList: Array<AnswerModel> = [];
  idAnswer: number = 0;
  idPoll: number = 0;

  isLinear = false;

  constructor(
    private formBuilder: FormBuilder,
    private quanInstService: QuantitativeInstrumentService) {
  }

  identification: ListTypes[] = [
    {value: 'CC', viewValue: 'Cedula Ciudadanía'},
    {value: 'CE', viewValue: 'Cedula Extranjería'},
    {value: 'NIP', viewValue: 'Número Identificación Personal'},
    {value: 'NIT', viewValue: 'Número Identificación Tributaría'},
    {value: 'TI', viewValue: 'Tarjeta Identidad'},
    {value: 'PAP', viewValue: 'Pasaporte'},
  ];

  sexList: ListTypes[] = [
    {value: '17', viewValue: 'Hombre'},
    {value: '18', viewValue: 'Mujer'},
    {value: '19', viewValue: 'Indeterminado'}
  ];

  ethnicityList: ListTypes[] = [
    {value: '20', viewValue: 'Indigena'},
    {value: '21', viewValue: 'Afrodescendiente, Afrocolombiano'},
    {value: '22', viewValue: 'Gitano/Gypsy'},
    {value: '23', viewValue: 'Palenquero'},
    {value: '24', viewValue: 'Raizal'},
    {value: '25', viewValue: 'Ninguno'}
  ]

  civilStatusList: ListTypes[] = [
    {value: 'sol', viewValue: 'Soltero (a)'},
    {value: 'unL', viewValue: 'Unión libre'},
    {value: 'div', viewValue: 'Divorciado (a)'},
    {value: 'cas', viewValue: 'Casado (a)'},
    {value: 'viu', viewValue: 'Viudo (a)'},
  ];

  accessServiciesList: string[] = [
    'Acueducto',
    'Alcantarillado',
    'Electricidad',
    'Gas',
    'Internet fijo o móvil',
    'Televisión',
    'Telefonía fijo o móvil'
  ];

  typeDwellingList: ListTypes[] = [
    {value: 'cas', viewValue: 'Casa'},
    {value: 'apt', viewValue: 'Apartamento'},
    {value: 'cua', viewValue: 'Tipo cuarto (s) en inquilinato'},
    {value: 'est', viewValue: 'Tipo cuartos (s) en otra estructura'},
    {value: 'otr', viewValue: 'otro'},
  ];

  scholarshipList: ListTypes[] = [
    {value: 'pre', viewValue: 'Preescolar'},
    {value: 'pri', viewValue: 'Básica primaria'},
    {value: 'sec', viewValue: 'Básica secundaria'},
    {value: 'med', viewValue: 'Educación media'},
    {value: 'tec', viewValue: 'Técnico/tecnólogo'},
    {value: 'uni', viewValue: 'Universitario'},
    {value: 'pos', viewValue: 'Posgrado'},
    {value: 'nin', viewValue: 'Ninguno'},
  ];

  occupationList: ListTypes[] = [
    {value: 'emp', viewValue: 'Empleado'},
    {value: 'ind', viewValue: 'Independiente'},
    {value: 'des', viewValue: 'Desempleado'},
    {value: 'desPan', viewValue: 'Desempleado a raíz de la pandemia'},
    {value: 'pen', viewValue: 'Pensionado'},
    {value: 'est', viewValue: 'Estudiante'},
    {value: 'cas', viewValue: 'Ama de casa '},
  ];

  workModeList: ListTypes[] = [
    {value: '3', viewValue: 'Presencial'},
    {value: '4', viewValue: 'Virtual'},
    {value: '5', viewValue: 'Semipresencial'}
  ];

  socialSecurityList: ListTypes[] = [
    {value: '48', viewValue: 'Empeoró'},
    {value: '49', viewValue: 'Quedó igual'},
    {value: '50', viewValue: 'Mejoró'}
  ];

  comorbilityList: ListTypes[] = [
    {value: '66', viewValue: 'Hipertensión'},
    {value: '67', viewValue: 'Asma'},
    {value: '68', viewValue: 'EPOC'},
    {value: '69', viewValue: 'Diabetes'},
    {value: '70', viewValue: 'Enfermedades del corazón'},
    {value: '71', viewValue: 'Enfermedades del riñon'},
    {value: '72', viewValue: 'Obesidad o sobrepeso'},
    {value: '73', viewValue: 'Usa medicamentos'},
    {value: '74', viewValue: 'VIH'},
    {value: '75', viewValue: 'Hipo-Hipertironismo'},
    {value: '76', viewValue: 'Cáncer'},
  ];

  affectationCovidList: ListTypes[] = [
    {value: '77', viewValue: 'Leve'},
    {value: '78', viewValue: 'Moderada'},
    {value: '79', viewValue: 'Severa/Hospitalización'}
  ];

  aftermathList: ListTypes[] = [
    {value: '81', viewValue: 'Físico'},
    {value: '82', viewValue: 'Psicológico'},
    {value: '83', viewValue: 'Familiar'},
    {value: '84', viewValue: 'Laboral'},
    {value: '85', viewValue: 'Educativo'},
    {value: '86', viewValue: 'Relación de pareja'},
    {value: '0', viewValue: 'Todos los anterioles'},
  ];

  deadFamilyList: ListTypes[] = [
    {value: '87', viewValue: 'Tristeza Profunda'},
    {value: '88', viewValue: 'Culpabilidad'},
    {value: '89', viewValue: 'Confusión'},
    {value: '90', viewValue: 'Preocuoación excesiva'},
    {value: '91', viewValue: 'Resentimiento'},
    {value: '92', viewValue: 'Problemas de sueño'},
    {value: '0', viewValue: 'Todas las anteriores'},
  ];

  workCovidList: ListTypes[] = [
    {value: '93', viewValue: 'Aumento en la carga laboral'},
    {value: '104', viewValue: 'Conflictos con los compañeros'},
    {value: '94', viewValue: 'Desmotivación laboral'},
    {value: '95', viewValue: 'Reducción de salario'},
    {value: '0', viewValue: 'Todas las anteriores'},
  ];

  studentList: ListTypes[] = [
    {value: '96', viewValue: 'Aumento carga académica'},
    {value: '97', viewValue: 'Desmotivación'},
    {value: '98', viewValue: 'Falta de tiempo libre'},
    {value: '99', viewValue: 'Dificultades de entendimiento'},
    {value: '100', viewValue: 'Abandono de estudios'},
    {value: '0', viewValue: 'Todas las anteriores'},
  ];

  vaccinationPostureList: ListTypes[] = [
    {value: '101', viewValue: 'A favor'},
    {value: '102', viewValue: 'En contra'},
    {value: '103', viewValue: 'Indiferente'},
  ];

  questionsMentalHealtList: ListTypes[] = [
    {value: '41', viewValue: 'Se ha sentido triste o infeliz'},
    {value: '42', viewValue: 'Ha dormido menos de lo habitual'},
    {
      value: '43',
      viewValue: 'Le han afectado eventos inesperados en su vida o en la vida de las personas con las que se relaciona'
    },
    {
      value: '44',
      viewValue: 'Ha perdido el control y la estabilidad debido a problemas y cambios importantes en su vida'
    },
    {value: '45', viewValue: 'Ha perdido el interes en otras actividades o personas'},
    {value: '46', viewValue: 'Se ha sentido optimista y motivado(a) a pesar de sus fracasos'},
    {value: '47', viewValue: 'No ha podido concentrarse tan bien como habitualmente'},
    {value: '48', viewValue: 'Ha incrementado en consumo de alcohol u otras sustancias psicoactivas'},
    {value: '49', viewValue: 'Se ha criticado y culpado a mi mismo por todo lo malo que ha sucedido'},
    {value: '50', viewValue: 'Se ha sentido inquieto, tenso o agitado'},
    {value: '51', viewValue: 'Ha estado mas irritable de lo habitual'},
    {value: '52', viewValue: 'Ha sentido miedo y desesperanza respecto a su futuro'},
    {value: '53', viewValue: 'Todo el tiempo ha pensado en su salud y le ha preocupado adquirir una enfermedad'},
    {value: '54', viewValue: 'Se ha sentido mas cansado o fatigado de lo habitual'},
    {value: '55', viewValue: 'No ha experimentado placer por las cosas que solia disfrutar'},
    {value: '56', viewValue: 'Ha perdido el interes sexual'},
    {value: '57', viewValue: 'Se ha sentido culpable respecto de las cosas que hizo o debió hacer'},
    {value: '58', viewValue: 'Ha tenido pensamientos o deseos de matarse'},
    {
      value: '59',
      viewValue: '¿Cómo te sentiste con tu familia el tiempo que estuvieron en casa sin poder salir a causa del virus'
    },
  ];

  citiesList: ListTypes[] = [
    {value: '19001	', viewValue: '	POPAYAN'},
    {value: '19022	', viewValue: '	ALMAGUER'},
    {value: '19050	', viewValue: '	ARGELIA'},
    {value: '19075	', viewValue: '	BALBOA'},
    {value: '19100	', viewValue: '	BOLIVAR'},
    {value: '19110	', viewValue: '	BUENOS AIRES'},
    {value: '19130	', viewValue: '	CAJIBIO'},
    {value: '19137	', viewValue: '	CALDONO'},
    {value: '19142	', viewValue: '	CALOTO'},
    {value: '19212	', viewValue: '	CORINTO'},
    {value: '19256	', viewValue: '	EL TAMBO'},
    {value: '19290	', viewValue: '	FLORENCIA'},
    {value: '19300	', viewValue: '	GUACHENE'},
    {value: '19318	', viewValue: '	GUAPI'},
    {value: '19355	', viewValue: '	INZA'},
    {value: '19364	', viewValue: '	JAMBALO'},
    {value: '19392	', viewValue: '	LA SIERRA'},
    {value: '19397	', viewValue: '	LA VEGA'},
    {value: '19418	', viewValue: '	LOPEZ'},
    {value: '19450	', viewValue: '	MERCADERES'},
    {value: '19455	', viewValue: '	MIRANDA'},
    {value: '19473	', viewValue: '	MORALES'},
    {value: '19513	', viewValue: '	PADILLA'},
    {value: '19517	', viewValue: '	PAEZ'},
    {value: '19533	', viewValue: '	PIAMONTE'},
    {value: '19548	', viewValue: '	PIENDAMO'},
    {value: '19573	', viewValue: '	PUERTO TEJADA'},
    {value: '19532	', viewValue: '	PATIA'},
    {value: '19585	', viewValue: '	PURACE'},
    {value: '19622	', viewValue: '	ROSAS'},
    {value: '19693	', viewValue: '	SAN SEBASTIAN'},
    {value: '19698	', viewValue: '	SANTANDER DE QUILICHAO'},
    {value: '19701	', viewValue: '	SANTA ROSA'},
    {value: '19743	', viewValue: '	SILVIA'},
    {value: '19760	', viewValue: '	SOTARA'},
    {value: '19780	', viewValue: '	SUAREZ'},
    {value: '19785	', viewValue: '	SUCRE'},
    {value: '19807	', viewValue: '	TIMBIO'},
    {value: '19809	', viewValue: '	TIMBIQUI'},
    {value: '19821	', viewValue: '	TORIBIO'},
    {value: '19824	', viewValue: '	TOTORO'},
    {value: '19845	', viewValue: '	VILLA RICA'}
  ];

  ngOnInit(): void {
    this.secundaryInfo = this.formBuilder.group({
      age: ['', Validators.required],
      gender: ['', Validators.required],
      ethnicity: ['', Validators.required],
      civilStatus: ['', Validators.required],
      municipalityResidence: ['', Validators.required],
      accessServicies: ['', Validators.required],
      numberChildrens: ['', Validators.required],
      socialSecurity: ['', Validators.required],
      personCoexist: ['', Validators.required],
      typeDwelling: ['', Validators.required],
      scholarship: ['', Validators.required],
      dependents: ['', Validators.required],
      occupation: ['', Validators.required],
      workMode: [''],
    });
    this.personalInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondName: [''],
      secondLastName: [''],
      identification: ['', Validators.required],
      typeIdentification: ['', Validators.required],
      address: ['', Validators.required],
      cellphone: ['', Validators.required],
    });
    this.comorbidityFormGroup = this.formBuilder.group({
      disorder: ['']
    });

    this.factors = this.formBuilder.group({});

    this.quinto = this.formBuilder.group({});

    this.quanInstService.findAllQuestion().subscribe(response => {
      console.log('question', response)
    })

    this.quanInstService.findAll().subscribe(response => {
      console.log('answer', response.data)
    })
  }

  saveAnswerPersonalInfo(answerForm: FormGroup) {
    let answer1: AnswerModel = {
      idAnswer: this.idAnswer + 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.firstName,
      idPoll: this.idAnswer + 1,
    };

    let answer2: AnswerModel = {
      idAnswer: this.idAnswer + 2,
      idQuestion: 1,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.secondName,
      idPoll: this.idAnswer + 1,
    };

    let answer3: AnswerModel = {
      idAnswer: this.idAnswer + 3,
      idQuestion: 3,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.firstLastName,
      idPoll: this.idAnswer + 1,
    };

    let answer4: AnswerModel = {
      idAnswer: this.idAnswer + 4,
      idQuestion: 1,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.secondLastName,
      idPoll: this.idAnswer + 1,
    };

    let answer5: AnswerModel = {
      idAnswer: this.idAnswer + 5,
      idQuestion: 4,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.typeIdentification,
      idPoll: this.idAnswer + 1,
    };

    let answer6: AnswerModel = {
      idAnswer: this.idAnswer + 6,
      idQuestion: 5,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer7: AnswerModel = {
      idAnswer: this.idAnswer + 7,
      idQuestion: 1,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.address,
      idPoll: this.idAnswer + 1,
    };

    let answer8: AnswerModel = {
      idAnswer: this.idAnswer + 8,
      idQuestion: 8,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.cellphone,
      idPoll: this.idAnswer + 1,
    };

    this.answerList.push(answer1)
    this.answerList.push(answer2)
    this.answerList.push(answer3)
    this.answerList.push(answer4)
    this.answerList.push(answer5)
    this.answerList.push(answer6)
    this.answerList.push(answer7)
    this.answerList.push(answer8)
  }

  saveAnswerSecundaryInfo(answerForm: FormGroup) {
    let answer9: AnswerModel = {
      idAnswer: this.idAnswer + 9,
      idQuestion: 9,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.age,
      idPoll: this.idAnswer + 1,
    };

    let answer10: AnswerModel = {
      idAnswer: this.idAnswer + 10,
      idQuestion: 7,
      idOptionAnswer: answerForm.value.sex,
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer11: AnswerModel = {
      idAnswer: this.idAnswer + 11,
      idQuestion: 10,
      idOptionAnswer: answerForm.value.ethnicity,
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer12: AnswerModel = {
      idAnswer: this.idAnswer + 12,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.civilStatus,
      idPoll: this.idAnswer + 1,
    };

    //Pendiente Zona de Residencia
    let answer13: AnswerModel = {
      idAnswer: this.idAnswer + 13,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.zonaresidencia,
      idPoll: this.idAnswer + 1,
    };

    let answer14: AnswerModel = {
      idAnswer: this.idAnswer + 14,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.municipalityResidence,
      idPoll: this.idAnswer + 1,
    };

    let answer15: AnswerModel = {
      idAnswer: this.idAnswer + 15,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.accessServicies,
      idPoll: this.idAnswer + 1,
    };

    let answer16: AnswerModel = {
      idAnswer: this.idAnswer + 16,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.numberChildrens,
      idPoll: this.idAnswer + 1,
    };

    let answer17: AnswerModel = {
      idAnswer: this.idAnswer + 17,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.socialSecurity,
      idPoll: this.idAnswer + 1,
    };

    let answer18: AnswerModel = {
      idAnswer: this.idAnswer + 18,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.personCoexist,
      idPoll: this.idAnswer + 1,
    };

    let answer19: AnswerModel = {
      idAnswer: this.idAnswer + 19,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.typeDwelling,
      idPoll: this.idAnswer + 1,
    };

    let answer20: AnswerModel = {
      idAnswer: this.idAnswer + 20,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.scholarship,
      idPoll: this.idAnswer + 1,
    };

    let answer21: AnswerModel = {
      idAnswer: this.idAnswer + 21,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.dependents,
      idPoll: this.idAnswer + 1,
    };

    let answer22: AnswerModel = {
      idAnswer: this.idAnswer + 22,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.occupation,
      idPoll: this.idAnswer + 1,
    };

    let answer23: AnswerModel = {
      idAnswer: this.idAnswer + 23,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.workMode,
      idPoll: this.idAnswer + 1,
    };

    this.answerList.push(answer9)
    this.answerList.push(answer10)
    this.answerList.push(answer11)
    this.answerList.push(answer12)
    this.answerList.push(answer13)
    this.answerList.push(answer14)
    this.answerList.push(answer15)
    this.answerList.push(answer16)
    this.answerList.push(answer17)
    this.answerList.push(answer18)
    this.answerList.push(answer19)
    this.answerList.push(answer20)
    this.answerList.push(answer21)
    this.answerList.push(answer22)
    this.answerList.push(answer23)
  }

  saveAnswerComorbidity(answerForm: FormGroup) {
    let answer24: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer25: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer26: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer27: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer28: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer29: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer30: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer31: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer32: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer33: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer34: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer35: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer36: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer37: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer38: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer39: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer40: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer41: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer42: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer43: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer44: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer45: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer46: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer47: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };


    let answer48: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer49: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer50: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer51: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer52: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer53: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer54: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer55: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer56: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer57: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer58: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer59: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer60: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer61: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer62: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer63: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer64: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer65: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer66: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer67: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    this.answerList.push(answer24)
    this.answerList.push(answer25)
    this.answerList.push(answer26)
    this.answerList.push(answer27)
    this.answerList.push(answer28)
    this.answerList.push(answer29)
    this.answerList.push(answer30)
    this.answerList.push(answer31)
    this.answerList.push(answer32)
    this.answerList.push(answer33)
    this.answerList.push(answer34)
    this.answerList.push(answer35)
    this.answerList.push(answer36)
    this.answerList.push(answer37)
    this.answerList.push(answer38)
    this.answerList.push(answer39)
    this.answerList.push(answer40)
    this.answerList.push(answer41)
    this.answerList.push(answer42)
    this.answerList.push(answer43)
    this.answerList.push(answer44)
    this.answerList.push(answer45)
    this.answerList.push(answer46)
    this.answerList.push(answer47)
    this.answerList.push(answer48)
    this.answerList.push(answer49)
    this.answerList.push(answer50)
    this.answerList.push(answer51)
    this.answerList.push(answer52)
    this.answerList.push(answer53)
    this.answerList.push(answer54)
    this.answerList.push(answer55)
    this.answerList.push(answer56)
    this.answerList.push(answer57)
    this.answerList.push(answer58)
    this.answerList.push(answer59)
    this.answerList.push(answer60)
    this.answerList.push(answer61)
    this.answerList.push(answer62)
    this.answerList.push(answer63)
    this.answerList.push(answer64)
    this.answerList.push(answer65)
    this.answerList.push(answer66)
    this.answerList.push(answer67)
  }

  saveAnswer() {
    console.log(this.answerList)

    this.quanInstService.create(this.answerList).subscribe(response => {
      console.log(response.data)
    })
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.personalInfo.controls[controlName];
    if (!control)
      return false;

    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  isControlHasErrorSecundary(controlName: string, validationType: string): boolean {
    const control = this.secundaryInfo.controls[controlName];
    if (!control)
      return false;

    return control.hasError(validationType) && (control.dirty || control.touched);
  }
}
