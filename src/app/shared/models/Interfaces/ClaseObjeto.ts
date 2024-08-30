export interface ClaseObjeto {
  nombre:            string;
  codigo:            string;
  objetos:           any[];
  subClasessObjetos: any[];
  id:                number;
  fechaRegistro:     Date;
  fechaModificacion: Date;
  creadoPor:         number;
  modificadoPor:     number;
  estatus:           boolean;
  borrado:           boolean;
}
