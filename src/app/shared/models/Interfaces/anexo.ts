import { SafeResourceUrl } from "@angular/platform-browser";

export interface Anexo {
  id:                  number;
  objetoId:            number;
  nombreArchivo:       string;
  tipoContenidoId:     number;
  tamano:              number;
  tamanoConvertido:    string;
  extension:           string;
  descripcion:         string;
  nombreTipoContetido: string;
  tipo:                string;
  path:                string;
  data:                null;
  archivo:             string;
  url:                 SafeResourceUrl;
  creadoPor:           string;
  modificadoPor:       string;
  estatus:             boolean;
  archivoPdf:          string;
}
