
# Tec-medika

Sistema que ayuda en la gestión de historial clínico de pacientes y citas periódicas.

## Funcionalidad

#### Usuarios
- Listado de Usuarios
- Activa o inactiva usuario tipo doctor

### Pacientes
- Listado
- Registro
- Edición
- Eliminar

### Citas 
- Listado
- Registro de citas
- Edición de cita
- Eliminar cita
- Iniciar cita
- Descargar Historia clínica

## Tecnologia
- Reactjs v18
- Laravel v10
- Mysql
- node > v18

### Librerias
- dompdf
- moment
- crypto-js
- react-select
- rsuite
- sweetalert2

## Instalación
Instale dependencias de Laravel

```
    composer install
```

Instale dependencias de react

```
    npm install
```

## Iniciar proyecto

Debe crear la base de datos en Mysql

Dentro de la raiz del proyecto, ingrese el siguiente comando para copiar el archivo `${.env.example}`

```
    cp .env.example .env
```

Dentro del archivo `${.env}` debe actalizar las variables
```
    DB_DATABASE = nombre de la base de datos creada anteriormente
    DB_USER = nombre de usuario asignado a la base de datos
    DB_PASSWORD = contraseña del usuario asignado a la base de datos

    agregue las siguientes lineas para el correcto funcionamiento del Sistema

    VITE_HOST="http://127.0.0.1:8000/api/"
    VITE_SECRET= debe agregar una contraseña
```

Una vez que realizo los pasos anteriores, ejecute los siguientes comandos 
```
    - creacion de tablas
    php artisan migrate

    - llenado de datos de usuario
    php artisan db:seed
```

dos ventanas de comandos
```
    En la primera ejecute 
    npm run dev

    En la segunda ejecute
    php artisan serve
```

Desde el navegador ingrese a la direccion `${http://127.0.0.1}`, se mostrara una ventana de inicio de sesión, puede iniciar sesión con las siguientes cuentas

```
    administrador
    sistemas@tecmedkica.com - admin

    doctores
    rgonzalez@tecmedika.com - doc1
    vescalante@tecmedika.com - doc2
    alopez@tecmedika.com - doc3
