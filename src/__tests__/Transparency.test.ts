import {Payroll, PayrollParams} from '../payroll'

test('GetPayroll', async () => {
    let res = await Payroll.GetPayroll({
        page: 1,
        periodo: '20230301',
        nombres: 'oliver',
        apellidos: 'garcia',
        institucion: '',
        cargo: '',
        lugar: '',
        genero: '',
        estatus: ''
    })

    expect(res).toBeTruthy();

},25000);