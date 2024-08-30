export interface Parametro {
    id?: number,
    nombre: string,
    valor1: string,
    valor2: string,
    descripcion: string,
    estatus?:boolean;
    creadoPor?:number,
    modificadoPor?:number,
    nombreCreadoPor:string ;
    nombreModificadoPor:string ;
    fechaRegistro:string ;
    fechaModificacion:string ;
  }
