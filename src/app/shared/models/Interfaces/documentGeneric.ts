export interface DocumentoGenerico{
  item: Array<{
    id: number;
    archivo: string;
    creadoPor: string;
    descripcion: string;
    estatus: boolean;
    extension: string;
    fechaModificacion: string;
    nombreArchivo: string;
    nombreTipoContenido: string;
    path: string;
    tipo: string;
  }>
}
