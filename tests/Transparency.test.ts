import { Transparency } from '../src/Transparency'

test('GetPayroll', async () => {
    let res = await Transparency.GetPayroll({
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

},30000);