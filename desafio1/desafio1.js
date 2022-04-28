class Usuario {
  constructor() {
    this.nombre = "Tomás";
    this.apellido = "Aronna San Martín";
    this.libros = [{ titulo: "IT", autor: "Stephen King" }];
    this.mascotas = ["Ella", "Pancho", "Spock"];
  }
  nombreCompleto() {
    return `El nombre del usuario es ${this.nombre + " " + this.apellido}`;
  }
  agregarMascota(mascota) {
    this.mascotas.push(mascota);
    return this.mascotas;
  }
  contarMascotas() {
    return this.mascotas.length;
  }
  agregarLibro(titulo, autor) {
    this.libros.push({ titulo, autor });
  }
  getLibros() {
    return this.libros.map((libro) => libro.titulo);
  }
}

const res = new Usuario();

res.agregarMascota("Oreo");
res.agregarLibro("Viaje al Oeste", "Wu Cheng'en");

console.log(res.nombreCompleto());
console.log(res.contarMascotas());
console.log(res.getLibros());
