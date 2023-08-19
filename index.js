import { Sequelize, DataTypes } from 'sequelize';

// Conexión a la base de datos
const sequelize = new Sequelize('individual6', 'postgres', 'pipe1234', {
  host: 'localhost',
  dialect: 'postgres'
});

// Modelo Cliente
const Cliente = sequelize.define('cliente', {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  direccion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rut: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

// Modelo Producto
const Producto = sequelize.define('producto', {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  codigo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  }
});

// Modelo intermedio para representar la relación muchos-a-muchos
const Cliente_Producto = sequelize.define('cliente_producto', {
  clienteRut: {
    type: Sequelize.INTEGER,
    references: {
      model: Cliente,
      key: 'rut'
    }
  },
  productoCodigo: {
    type: Sequelize.INTEGER,
    references: {
      model: Producto,
      key: 'codigo'
    }
  }
});

// Crear la relación entre Cliente y Producto
Cliente.belongsToMany(Producto, { through: Cliente_Producto });
Producto.belongsToMany(Cliente, { through: Cliente_Producto });

// Sincronizar modelos con la base de datos
sequelize.sync({ force: true }).then(() => {
  console.log('Tablas creadas');
}).finally(() => {
  sequelize.close();
});
