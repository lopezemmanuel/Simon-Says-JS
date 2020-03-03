const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

const sound1 = new Audio('sounds/1-do.mp3')
const sound2 = new Audio('sounds/2-re.mp3')
const sound3 = new Audio('sounds/3-mi.mp3')
const sound4 = new Audio('sounds/4-fa.mp3')

var nivelUsuario = 10

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(()=> this.siguienteNivel(), 1000)
        
    }

    inicializar() {
        btnEmpezar.classList.add('hide')
        this.elegirColor = this.elegirColor.bind(this)
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(nivelUsuario).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
        this.contador(this.nivel)
    }

    numeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    colorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.numeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 650 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        this.playAudio(color)
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.colorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        this.playAudio(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel === (nivelUsuario+1)){
                    this.ganarJuego()
                } else{
                    setTimeout(() => this.siguienteNivel(), 1000)
                }
            } 
        } else{
           this.perderJuego()
        }
    }

    playAudio(nombreColor) {
        switch (nombreColor) {
            case 'celeste':
                sound1.play()
            break
            case 'violeta':
                sound2.play()
            break
            case 'naranja':
                sound3.play()
            break
            case 'verde':
                sound4.play()
            break
        }
    }

    ganarJuego(){
        swal('Has ganado 🎉', `Has terminado los ${nivelUsuario} niveles del juego. ¡Felicidades!`, 'success')
            .then(() => location.reload())
    }

    perderJuego(){
        swal('Has perdido 😥', 'Has perdido, sigue intentando', 'error')
            .then(() => location.reload())
    }

    contador(nivelActual){
        document.getElementById('contador-nivel').innerHTML = `Nivel: ${nivelActual}`
    }
}

function empezarJuego() {
    var juego = new Juego()
}