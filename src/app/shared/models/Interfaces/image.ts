import { SafeResourceUrl } from "@angular/platform-browser";

export interface Image{
  archivo: string;
  tipoContenidoId: number;
  objetoId: number;
  id: number;
  tipo: number;
  nombreTipoContetido: string;
  descripcion: string;
  nombreArchivo: string;
  url: SafeResourceUrl;

}
