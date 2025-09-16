type Horario = {
  fecha_inicio: Date | string;
  fecha_fin: Date | string;
};

export interface Disponibilidad {
  lunes: Horario;
  martes: Horario;
  miercoles: Horario;
  jueves: Horario;
  viernes: Horario;
}
