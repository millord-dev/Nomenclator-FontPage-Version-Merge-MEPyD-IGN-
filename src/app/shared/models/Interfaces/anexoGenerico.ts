import { SafeResourceUrl } from '@angular/platform-browser';

export interface AnexoGenerico {
  nombreArchivo:       string;
  tipo:                string;
  tipoContenidoId:     number;
  tamano:              number;
  tamanoConvertido:    string;
  extension:           string;
  descripcion:         string;
  fechaRegistro:       Date;
  fechaModificacion:   Date;
  creadoPor:           number;
  modificadoPor:       number;
  nombreCreadoPor:     string;
  nombreModificadoPor: string;
  estatus:             boolean;
  nombreTipoContenido: string;
  path:                string;
  data:                string;
  url:                 SafeResourceUrl;
  archivo:             string;
  tipoContenido:       TipoContenido;
  id:                  number;
}

export interface TipoContenido {
  descripcion:   string;
  estatus:       boolean;
  creadoPor:     string;
  modificadoPor: string;
  id:            number;
}
