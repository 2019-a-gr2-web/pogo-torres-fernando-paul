export interface User {

    idUser?:number;
    nombreUser:string;
    passUser:string;
    tipoUser?: 'Admin' | 'Usuario' | 'Despachador';

}
