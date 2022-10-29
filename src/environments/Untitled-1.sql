
--Creamos secuencia para los errores
--create sequence seq_error;
CREATE OR REPLACE PROCEDURE PA_INSERTAR_ERROR(NOMSUBPROGRAMA VARCHAR2,msj VARCHAR2) IS
--declaramos las variables
V_INS  VARCHAR2(500);
ID_ERROR NUMBER;

--Funcion ERROR

BEGIN
    error := SEQ_ERROR.NEXTVAL; 
    V_INS := 'INSERT INTO ERRORES_PROCESO VALUES(:1,:2,:3)';
EXECUTE IMMEDIATE V_INS USING error,NOMSUBPROGRAMA,msj;
END;

--FUNCION servicio
CREATE OR REPLACE FUNCTION FB_PUB_VALOR_SERV (id_resv number) RETURN NUMBER IS
--Declarar variables
v_tot_servicio number;
msj varchar2(500);
val_monto varchar2(500);

--Empezamos la funcion

BEGIN
val_monto := 'Function valor servicio.';
select sum(s.v_servicio)
into v_tot_servicio
from reserva r
inner join servicio s on r.servicio_id= s.id_servicio
where r.id_reserva = id_resv;

IF v_tot_servicio is null then
    v_tot_servicio := 0;
END IF;

return v_tot_servicio;
EXCEPTION
WHEN too_many_rows THEN
msj := sqlerrm;
INSERT INTO tabla_errores VALUES (
    SEQ_ERROR.NEXTVAL,
    val_monto,
    msj);
END;

--create sequence seq_aud;

--Trigger

create or replace trigger trigger_sueldo
after update or delete or update ON MECANICO
for each row
begin
IF UPDATING then
insert into cambio_sueldo values (seq_aud.nextval,'VALOR ANTIGUO:':OLD.SUELDO'SUELDO NUEVO:':new.SUELDO, :old.ID_MECANICO);

ELSIF INSERTING then
insert into mod_sueldo values (seq_aud.nextval,'SUELDO NUEVO:':new.SUELDO, :new.ID_MECANICO);

ELSIF DELETING then
    insert into mod_sueldo values (seq_aud.nextval,'SUELDO antiguo:'||:old.SUELDO, :old.ID_MECANICO);
END IF;

end;

--Crear tablas

--Tabla cliente

CREATE TABLE cliente (
    id_cliente   INTEGER NOT NULL,
    contrasennia VARCHAR2(60 BYTE) NOT NULL,
    nombre       VARCHAR2(30 BYTE) NOT NULL,
    num_tel      INTEGER NOT NULL
);

ALTER TABLE cliente ADD CONSTRAINT cliente_pk PRIMARY KEY ( id_cliente );

--Tabla detalle

CREATE TABLE detalle (
    id_detalle         INTEGER NOT NULL,
    subtotal           INTEGER NOT NULL,
    boleta_id_boleta INTEGER NOT NULL,
    reserva_id_reserva INTEGER NOT NULL
);

ALTER TABLE detalle ADD CONSTRAINT detalle_pk PRIMARY KEY ( id_detalle );

--Tabla boleta

CREATE TABLE boleta (
    id_boleta INTEGER NOT NULL,
    valor_fac  INTEGER NOT NULL
);

ALTER TABLE boleta ADD CONSTRAINT boleta_pk PRIMARY KEY ( id_boleta );

--Tabla mecanico

CREATE TABLE mecanico (
    id_mecanico  INTEGER NOT NULL,
    nom_mecanico VARCHAR2(40 BYTE) NOT NULL,
    apelido      VARCHAR2(40 BYTE) NOT NULL,
    correo_mec   VARCHAR2(40 BYTE) NOT NULL,
    sueldo       INTEGER NOT NULL
);

ALTER TABLE mecanico ADD CONSTRAINT mecanico_pk PRIMARY KEY ( id_mecanico );

--Tabla producto

CREATE TABLE producto (
    id_producto            INTEGER NOT NULL,
    nom_prod               VARCHAR2(50 BYTE) NOT NULL,
    precio_prod            VARCHAR2(50 BYTE),
    stock                  INTEGER NOT NULL,
    proveedor_id_proveedor INTEGER NOT NULL,
    detalle_id_detalle     INTEGER NOT NULL
);

ALTER TABLE producto ADD CONSTRAINT producto_pk PRIMARY KEY ( id_producto );

--Tabla proveedor

CREATE TABLE proveedor (
    id_proveedor INTEGER NOT NULL,
    nom_prov     VARCHAR2(50 BYTE) NOT NULL,
    correo_prov  VARCHAR2(50 BYTE) NOT NULL
);

ALTER TABLE proveedor ADD CONSTRAINT proveedor_pk PRIMARY KEY ( id_proveedor );

--Tabla reserva

CREATE TABLE reserva (
    id_reservaV           INTEGER NOT NULL,
    fecha                DATE NOT NULL,
    cliente_id_cliente   INTEGER NOT NULL,
    mecanico_id_mecanico INTEGER NOT NULL,
    servicio_id INTEGER NOT NULL
);

ALTER TABLE reserva ADD CONSTRAINT reserva_pk PRIMARY KEY ( id_reservaV );

--Tabla servicio

CREATE TABLE servicio (
    id_servicio    INTEGER NOT NULL,
    nom_servicio   VARCHAR2(40 BYTE) NOT NULL,
    v_servicio INTEGER NOT NULL
);

ALTER TABLE servicio ADD CONSTRAINT servicio_pk PRIMARY KEY ( id_servicio );

--Tabla vehiculo

CREATE TABLE vehiculo (
    id_vehiculo        INTEGER NOT NULL,
    patente            VARCHAR2(10 BYTE) NOT NULL,
    modelo             VARCHAR2(30 BYTE) NOT NULL,
    marca              VARCHAR2(20 BYTE) NOT NULL,
    cliente_id_cliente INTEGER NOT NULL
);

--Tabla error para acumular errores

CREATE TABLE tabla_errores (
    id_error        INTEGER NOT NULL,
    nom_funcion            VARCHAR2(25 BYTE) NOT NULL,
    msj             VARCHAR2(500 BYTE) NOT NULL
);

--Tabla sueldo

CREATE TABLE mod_sueldo (
    ID INTEGER NOT NULL,
    SUELDO INTEGER NOT NULL,
    ID_MECANICO VARCHAR2 (50 BYTE ) 
);

--Llaves foraneas

ALTER TABLE mod_sueldo 
    ADD CONSTRAINT sueldo_pk PRIMARY KEY (id);

ALTER TABLE vehiculo 
    ADD CONSTRAINT vehiculo_pk PRIMARY KEY ( id_vehiculo );

ALTER TABLE detalle
    ADD CONSTRAINT detalle_boleta_fk FOREIGN KEY ( boleta_id_boleta )
        REFERENCES boleta ( id_boleta );

ALTER TABLE detalle
    ADD CONSTRAINT detalle_reserva_fk FOREIGN KEY ( reserva_id_reserva )
        REFERENCES reserva ( id_reserva );

ALTER TABLE producto
    ADD CONSTRAINT producto_detalle_fk FOREIGN KEY ( detalle_id_detalle )
        REFERENCES detalle ( id_detalle );

ALTER TABLE producto
    ADD CONSTRAINT producto_proveedor_fk FOREIGN KEY ( proveedor_id_proveedor )
        REFERENCES proveedor ( id_proveedor );

ALTER TABLE reserva
    ADD CONSTRAINT reserva_cliente_fk FOREIGN KEY ( cliente_id_cliente )
        REFERENCES cliente ( id_cliente );

ALTER TABLE reserva
    ADD CONSTRAINT reserva_mecanico_fk FOREIGN KEY ( mecanico_id_mecanico )
        REFERENCES mecanico ( id_mecanico );

ALTER TABLE reserva
    ADD CONSTRAINT reserva_servicio_fk FOREIGN KEY ( servicio_id_servicio )
        REFERENCES servicio ( id_servicio );

ALTER TABLE vehiculo
    ADD CONSTRAINT vehiculo_cliente_fk FOREIGN KEY ( cliente_id_cliente )
        REFERENCES cliente ( id_cliente );
