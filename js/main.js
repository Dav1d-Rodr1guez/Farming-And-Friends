  document.getElementById("productos").addEventListener("change", function() {
    var productoSeleccionado = this.value;
    var valoresProducto = obtenerValoresProducto(productoSeleccionado);
    document.getElementById("cajas").value = valoresProducto.cajas;
    document.getElementById("pallets").value = valoresProducto.pallets;
  });
  
  function obtenerValoresProducto(producto) {
    switch (producto) {
      case "trigo":
        return { cajas: 100, pallets: 2565 };
      case "maiz":
        return { cajas: 250, pallets: 6412 };
      case "arroz":
        return { cajas: 2000, pallets: 51300 };
      case "bambu":
        return { cajas: 8400, pallets: 215460 };
      case "soja":
        return { cajas: 24000, pallets: 615600 };
      case "col":
        return { cajas: 57000, pallets: 1477440 };
      case "zanahoria":
        return { cajas: 85000, pallets: 2180250 };
      case "papa":
        return { cajas: 120000, pallets: 3078000 };
      default:
        return { cajas: "", pallets: "" };
    }
  }

  function calcularGanancia() {
    // Obtener los valores del formulario
    const producto = document.getElementById("producto").value;
    const tipoVenta = document.getElementById("tipo-venta").value;
    const valorVenta = parseFloat(document.getElementById("valor-venta").value);
    const cantidadVendida = parseInt(document.getElementById("cantidad-vendida").value);
    const esMiembroFarmersClub = document.getElementById("farmers-club").checked;
    const esFan = document.getElementById("fan").checked;
  
    // Definir los valores de cajas y pallets por producto
    const cajasPorProducto = {
      trigo: 2,
      maiz: 5,
      arroz: 40,
      bambu: 168,
      soja: 480,
      col: 1140,
      zanahoria: 1700,
      papa: 2400
    };
  
    const palletsPorProducto = {
      trigo: 2565 / 27 / 50, // Convertir de pallets a cajas
      maiz: 6412 / 27 / 50,
      arroz: 51300 / 27 / 50,
      bambu: 215460 / 27 / 50,
      soja: 615600 / 27 / 50,
      col: 1477440 / 27 / 50,
      zanahoria: 2180250 / 27 / 50,
      papa: 3078000 / 27 / 50
    };
  
    // Calcular el total de la venta
    let total = valorVenta * cantidadVendida;
  
    // Aplicar descuentos adicionales si es miembro del Farmers Club y/o Fan
    if (esMiembroFarmersClub) {
      total *= 1.1; // Aumentar el total en un 10% si es miembro del Farmers Club
    }
  
    if (esFan) {
      total *= 1.05; // Aumentar el total en un 5% adicional si es Fan
    }
  
    // Mostrar el total en el campo correspondiente
    document.getElementById("total").value = total.toFixed(2);
    
    // Calcular la ganancia
    let ganancia = 0;
  
    if (tipoVenta === "caja") {
      // Calcular la ganancia para venta por caja
      let valorCompraCaja = cajasPorProducto[producto]; // Valor de compra por unidad de caja
      console.log("Valor de compra por caja:", valorCompraCaja);
  
      const totalCompraCaja = valorCompraCaja * cantidadVendida; // Total de la compra de cajas
      console.log("Total de compra de cajas:", totalCompraCaja);
  
      ganancia = total - totalCompraCaja;
    } else if (tipoVenta === "pallet") {
      // Calcular la ganancia para venta por pallet
      let totalCompraPallet = palletsPorProducto[producto] * cantidadVendida; // Total de la compra de pallets (en cajas)
      console.log("Total de compra de pallets (en cajas):", totalCompraPallet);
  
      ganancia = total - totalCompraPallet;
    }
  
    // Mostrar la ganancia en el campo de texto
    document.getElementById("ganancia").value = ganancia.toFixed(2);
  }
  
  // Escuchar el evento de envío del formulario
  document.querySelector("#ganancias form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se recargue la página
    calcularGanancia(); // Calcular la ganancia
  });
  
