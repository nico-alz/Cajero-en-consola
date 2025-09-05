let cuentas = {}
let usuarioActual = null

function registrar(usuario, pin) {
  if (cuentas[usuario]) { console.log("Usuario ya existe"); return }
  if (!/^\d{4}$/.test(pin)) { console.log("PIN inválido"); return }
  cuentas[usuario] = { pin, saldo: 0, historial: [] }
  cuentas[usuario].historial.push(`Cuenta creada para ${usuario}`)
  console.log(`Cuenta registrada: ${usuario}`)
}

function login(usuario, pin) {
  if (!cuentas[usuario]) { console.log("Usuario no encontrado"); return }
  if (cuentas[usuario].pin !== pin) { console.log("PIN incorrecto"); return }
  usuarioActual = usuario
  cuentas[usuario].historial.push("Inicio de sesión")
  console.log(`Sesión iniciada como ${usuario}`)
}

function logout() {
  if (!usuarioActual) { console.log("No hay sesión iniciada"); return }
  cuentas[usuarioActual].historial.push("Cierre de sesión")
  console.log(`Sesión cerrada de ${usuarioActual}`)
  usuarioActual = null
}

function depositar(monto) {
  if (!usuarioActual) { console.log("Inicia sesión primero"); return }
  monto = Number(monto)
  if (monto <= 0) { console.log("Monto inválido"); return }
  cuentas[usuarioActual].saldo += monto
  cuentas[usuarioActual].historial.push(`Depósito: $${monto}`)
  console.log(`Depositaste $${monto}. Saldo actual: $${cuentas[usuarioActual].saldo}`)
}

function retirar(monto) {
  if (!usuarioActual) { console.log("Inicia sesión primero"); return }
  monto = Number(monto)
  if (monto <= 0 || monto > cuentas[usuarioActual].saldo) { console.log("Monto inválido o saldo insuficiente"); return }
  cuentas[usuarioActual].saldo -= monto
  cuentas[usuarioActual].historial.push(`Retiro: $${monto}`)
  console.log(`Retiraste $${monto}. Saldo actual: $${cuentas[usuarioActual].saldo}`)
}

function transferir(destino, monto) {
  if (!usuarioActual) { console.log("Inicia sesión primero"); return }
  if (!cuentas[destino]) { console.log("Destino no existe"); return }
  monto = Number(monto)
  if (monto <= 0 || monto > cuentas[usuarioActual].saldo) { console.log("Monto inválido o saldo insuficiente"); return }
  cuentas[usuarioActual].saldo -= monto
  cuentas[destino].saldo += monto
  cuentas[usuarioActual].historial.push(`Transferencia enviada: $${monto} a ${destino}`)
  cuentas[destino].historial.push(`Transferencia recibida: $${monto} de ${usuarioActual}`)
  console.log(`Transferiste $${monto} a ${destino}. Saldo: $${cuentas[usuarioActual].saldo}`)
}

function historial() {
  if (!usuarioActual) { console.log("Inicia sesión primero"); return }
  console.log(`Historial de ${usuarioActual}:`)
  cuentas[usuarioActual].historial.forEach(h => console.log(" - " + h))
}

function saldo() {
  if (!usuarioActual) { console.log("Inicia sesión primero"); return }
  console.log(`Saldo actual de ${usuarioActual}: $${cuentas[usuarioActual].saldo}`)
}

